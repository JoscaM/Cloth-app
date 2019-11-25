import React,{Component} from 'react'
import Header from '../components/header/header.js';
import axios from 'axios';
//import ItemService from './ItemService.js';

class AddItem extends Component {
  constructor(props){
    super(props);
    this.onchange = this.onchange.bind(this);
    this.onsumbit = this.onsumbit.bind(this);
    ///this.addItemService = new ItemService();
    var obj = [{img: "chuck-black-hign.jpg", price: "3000000", brand: "Converse", type: "Shoe"},
{img: "chuck-black-short.jpg", price: "2000000", brand: "Converse", type: "Shoe"},
{img: "chuck-white-clean.jpg", price: "2500000", brand: "Converse", type: "Shoe"},
{img: "chuck-white-hign.jpg", price: "3500000", brand: "Converse", type: "Shoe"},
{img: "chuck-white-short.jpg", price: "2500000", brand: "Converse", type: "Shoe"},
{img: "nike-air.jpg", price: "1500000", brand: "Nike", type: "Shoe"},
{img: "nike-max.jpg", price: "1800000", brand: "Nike", type: "Shoe"},
{img: "nike-satrn.jpg", price: "5000000", brand: "Nike", type: "Shoe"}]


    this.state = {
      img : '',
      price: '',
      brand: '',
      type : '',
      obj : obj    }
  }
  componentDidMount(){
    console.log(this.state.obj);
    for (var x in this.state.obj){
      axios.post('http://localhost:4200/items/post', this.state.obj[x])
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  onsumbit(e){
    e.preventDefault();
    let obj = {
      img : this.state.img,
      price : this.state.price,
      brand : this.state.brand,
      type : this.state.type
    };
    e.preventDefault();
  //  this.addItemService.sendData(obj);

    axios.post('http://localhost:4200/items/post', obj)
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  onchange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  render(){

    return(
      <div class='container-fluid px-0'>
          <Header />
          <form className="col-4 was-validated mx-auto mt-5" onSubmit={this.onsumbit}>
            <div class="form-group">
              <label for="img">Images</label>
              <input required type="text" class="form-control" id="img" name="img" placeholder=".jpg" onChange={this.onchange}/>
              <div class="valid-feedback">Valid.</div>
              <div class="invalid-feedback">Please fill out this field.</div>
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input required type="text" class="form-control" id="price" name="price" placeholder="000000" onChange={this.onchange}/>
              <div class="valid-feedback">Valid.</div>
              <div class="invalid-feedback">Please fill out this field.</div>
          </div>
            <div class="form-group">
              <label for="brand">Brand</label>
              <input required type="text" class="form-control" id="brand" name="brand" placeholder="..." onChange={this.onchange}/>
              <div class="valid-feedback">Valid.</div>
              <div class="invalid-feedback">Please fill out this field.</div>
          </div>
            <div class="form-group">
              <label for="type">Type</label>
              <input required type="text" class="form-control" id="type" name="type" placeholder="..." onChange={this.onchange}/>
              <div class="valid-feedback">Valid.</div>
              <div class="invalid-feedback">Please fill out this field.</div>
          </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
      </div>
    );

  }
}

export default AddItem;
