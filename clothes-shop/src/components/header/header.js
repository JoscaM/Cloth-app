import React,{Component} from 'react';
import Logo from '../img/logo.jpg';
import {Link} from "react-router-dom";
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart : 0
    }
  }


  render(){
    return(
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div class='nav-brand ml-5'>
          <Link to='/'><img class='rounded-circle ' width='50' height='50' src={Logo} alt='shop-brand'></img></Link>
          <h3 className='d-inline align-center font-weight-bold' id='logo' > The coolest </h3>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-5">
              <li class="nav-item">
                <Link id='navbar-item' class="nav-link text-white-50" to='/' >New</Link>
              </li>
              <li class="nav-item">
                <Link id='navbar-item' class="nav-link text-white-50" to='/' >Jacket</Link>
              </li>
              <li class="nav-item">
                <Link id='navbar-item' class="nav-link text-white-50" to='/' >Short</Link>
              </li>
              <li class="nav-item">
                <Link id='navbar-item' class="nav-link text-white-50" to='/Shoe' >Shoe</Link>
              </li>
              <li class="nav-item">
                <Link  id='navbar-item' class="nav-link text-white-50" to='/' >Accessories</Link>
              </li>
            </ul>
          </div>
          <div>
              <Link to={'/ShoppingCart' }>
                 <span onClick={this.handleonClick} className='navbar-nav nav-item nav-link mx-2 px2'>
                   <i class="fa fa-shopping-cart" aria-hidden="true">
                     <span class="badge badge-danger">{this.props.value}</span>
                   </i>
                 </span>
              </Link>
          </div>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder=". . ." aria-label="Search"/>
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit"><span>Search</span></button>
          </form>

      </nav>
    );

  }
}

export default Header;
