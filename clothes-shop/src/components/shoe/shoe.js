import React,{Component} from 'react'
import axios from 'axios';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import Pagination from './Pagination';
import './shoestyle.css';
import Card from './card';
/// viet show item ra thanh 2 ham : 1 cho all item , 1 cho item brand

class ShoeList extends Component {
  constructor(props){
    super(props);
    this.onReceiveCart = this.onReceiveCart.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      result : '',
      cart : 0,
      listcart : [],
      pageOfItems : [],
      nameOfBrand : [],
      itemByBrand : []
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
     // listcart get localStorage
     if (shoppinglist === null){
       this.setState({listcart : []})

     }
     else {
       this.setState({listcart : shoppinglist})

     }
     //return localStorage.removeItem('cart');
}
  componentDidMount(){
       axios.get('http://localhost:4200/items')
       .then(response => {
         this.setState({ result: response.data });
          this.nameOfBrand(response.data);
       })
       .catch(function (error) {
         console.log(error);
       })

     }
  nameOfBrand =  (data) => {
    var current =[];
    data.forEach(function(element){
      if (!current.includes(element.brand)){
        current = [...current,element.brand]
      }
    })
    this.setState({nameOfBrand:current});
    console.log(current);
  }

  onReceiveCart(cartcount,id){
    console.log(this.state.listcart.includes(id));
    // Cart number : amount item add to cart
    if (!this.state.listcart.includes(id)){
      this.setState({cart : this.state.cart + cartcount});
      localStorage.setItem('cart' , this.state.cart + cartcount);// save localStorage
      // List cart
      this.setState({listcart: [...this.state.listcart,id]});// expand array by spread funnction
      localStorage.setItem('listcart' , JSON.stringify([...this.state.listcart,id]));// add items localStorage
    }
  }

  ShowItem(brand){
    if(this.state.result instanceof Array){
        var shoes = this.state.result;
        const shoesbybrand = shoes.filter((shoe) => {return shoe.brand === brand})
        // for (var x in shoes){
        //   if (shoes[x].brand === brand){
        //     shoesbybrand.push(shoes[x])
        //   }
        // }

        if (brand ==='all'){
          return this.state.pageOfItems.map((shoe) => <Card  obj={shoe} onReceiveCart={this.onReceiveCart}/> )

        }
        else {
          //return shoesbybrand.map((shoe) => <Card  obj={shoe} onReceiveCart={this.onReceiveCart}/> )
          return this.setState({itemByBrand : shoesbybrand})
        }
      }
  }
  /// return items each page Pagination

  onChangePage (pageOfItems){
    this.setState({pageOfItems : pageOfItems});
  }

  render(){

    return(
      <div class='shoe'>
        <Header value={this.state.cart} />
        <div class='container'>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a  onClick={this.ShowItem('all')} class="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
              </li>
              {
                this.state.nameOfBrand.map((brand) =>
                <li class="nav-item">
                  <a  class="nav-link" onClick={()=>this.ShowItem(brand)}  id={brand+"-tab"} data-toggle="tab" href={"#"+brand} role="tab" aria-controls='brand' aria-selected="false">{brand}</a>
                </li>
              )}
            {/*  <li class="nav-item">
                <a  class="nav-link" id="converse-tab" data-toggle="tab" href="#converse" role="tab" aria-controls="converse" aria-selected="false">Converse</a>
              </li>
              <li class="nav-item">
                <a  class="nav-link" id="nike-tab" data-toggle="tab" href="#nike" role="tab" aria-controls="nike" aria-selected="false">Nike</a>
              </li> */}
            </ul>
            <div class="tab-content" id="myTabContent">
              <div  class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                <div class='row my-3'>
                  {this.ShowItem('all')}
                </div>
                <div class='row'>
                  <Pagination items={this.state.result} onChangePage={this.onChangePage} />
                </div>
              </div>
              {this.state.nameOfBrand.map((brand)=>
                <div   class="tab-pane fade" id={brand} role="tabpanel" aria-labelledby={brand+"-tab"}>
                  <div class='row my-3'>

                      {this.state.pageOfItems.map((item) =>
                        <Card  obj={item} onReceiveCart={this.onReceiveCart}/>)
                      }

                  </div>
                  <div class ='row'>
                    <Pagination items={this.state.itemByBrand}  onChangePage={this.onChangePage} />
                  </div>
                </div>
            )}
              {/*
              <div class="tab-pane fade" id="converse" role="tabpanel" aria-labelledby="converse-tab">
                <div class='row my-3'>
                  {this.ShowItem('Converse')}
                </div>
              </div>
              <div class="tab-pane fade" id="nike" role="tabpanel" aria-labelledby="nike-tab">
                <div class='row my-3'>
                  {this.ShowItem('Nike')}
                </div>
              </div>
              */}

            </div>


        </div>
        <Footer />
      </div>
    );

  }
}

export default ShoeList;
