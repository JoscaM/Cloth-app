import React,{Component} from 'react'
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import axios from 'axios';
import TableRow from '../header/tablerow.js';

class ShoppingCart extends Component {
  constructor(props){
    super(props)
    this.onRecieveTotal = this.onRecieveTotal.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      result : '' ,
      checkout: '' ,
      quantify : '',// payment base on quantify
      total :0,
      cart : 0
    }
  }
  componentWillMount(){
    const cartcount = parseInt(localStorage.getItem('cart')) ;
    const shoppinglist = JSON.parse(localStorage.getItem('listcart')) ;
    //console.log(cartcount);
    //console.log(shoppinglist);
    // cart get localStorage
     if (isNaN(cartcount ) ){
       this.setState({cart : 0})

     }
     else {
       this.setState({cart : cartcount})
     }
     //add list cart to state
     if (shoppinglist === null){
       this.setState({checkout : []})
     }
     else {
       this.setState({checkout : shoppinglist});
       //create array with lenght = list cart
       var step = [];
       for(var x in shoppinglist){
        step = [...step,x]
       }
       this.setState({quantify : step})
     }
  }
  componentDidMount(){
    axios.get('http://localhost:4200/items')
    .then(response => {
      this.setState({ result: response.data });
      console.log('get data success')
    })
    .catch(function (error) {
      console.log(error);
    })
    //get list cart from localStorage

    //console.log(checkoutlist);

  }


  onRecieveTotal(id,price,quantify){
      var index = this.state.checkout.indexOf(id);//find index of id
      var step = this.state.quantify;
      step[index] = price*quantify;
      this.setState({quantify  : step})// set state qualify
      const total = step.reduce((total,current) => {return total + current})// sum total payment
      this.setState({total :total})

  }
  handleRemove(id){
    var step = this.state.checkout
    var index = this.state.checkout.indexOf(id);
    // remove id items out of localStorage
    step.splice(index,1);
    var quantify = this.state.quantify;
    // remove payment out of array quantify
    quantify.splice(index,1)
    this.setState({quantify : quantify})
    console.log(quantify);
      // update shoppinglist into localStorage
    localStorage.setItem('listcart',JSON.stringify(step));
    this.setState({cart : this.state.cart -1});
    localStorage.setItem('cart',parseInt(this.state.cart) - 1);

  }
  view(){
    if(this.state.result instanceof Array){
      const checkoutlist = this.state.result.filter((item) => {return this.state.checkout.includes(item._id)})
      return checkoutlist.map((shoe) => <TableRow  obj={shoe} onRecieveTotal={this.onRecieveTotal} handleRemove={this.handleRemove} />)
    }
  }
  handleSubmit(){
      console.log('success');
      localStorage.clear();
      this.props.history.push('/');
  }
  render(){
    //console.log(this.state.quantify);
    console.log(this.state.checkout);
    return(
      <div >
        <Header value={this.state.cart}/>
        <div class='container'>
          <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col"><span>No.</span></th>
                    <th scope="col"><span>Img</span></th>
                    <th scope="col"><span>Price</span></th>
                    <th scope="col"><span>Quantify</span></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.view()}
                </tbody>
                <tr>
                  <th className='align-middle' scope="col"></th>
                  <th className='align-middle' scope="col"><h3>Total</h3></th>
                  <th className='align-middle' scope="col"><span>{this.state.total}</span></th>
                  <td className='align-middle'>
                    <form onSubmit={this.handleSubmit}>
                      <button type="submit" className="btn btn-success"><span>Check out</span></button>
                    </form>
                  </td>
                </tr>
              </table>
            </div>
        <Footer />
     </div>
    );

  }
}

export default ShoppingCart;
