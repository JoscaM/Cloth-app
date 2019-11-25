import React,{Component} from 'react'
function importAll(r) {
    let images = {};
    r.keys().map((item) =>  {return  images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../img/shoe', false, /\.jpg$/));
class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      listcart :  []
    }
  }
  onhandleClick =(e)=> {
    const cartcount =  1
    //localStorage.setItem('listcart', JSON.stringify(this.state.listcart))
    this.props.onReceiveCart(cartcount,this.props.obj._id);
  }
  render(){
    return(
        <div class='card col-3 text-center'>
          <img src ={images[this.props.obj.img]} className='card-img-top' alt=''/>
          <div class='card-body border-top'>
            <p class='d-inline price'>{this.props.obj.price}</p>
            <button class=' btn btn-primary float-right buy' onClick={this.onhandleClick}><span>Add to cart</span></button>
          </div>
        </div>


    );

  }
}

export default Card;
