import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import ca1 from '../img/newcarousel1.jpg';
import ca2 from '../img/newcarousel2.jpg';
import ca3 from '../img/newcarousel3.jpg';
import ca4 from '../img/newcarousel4.jpg';
class CarouselNew extends Component {

  render(){
    return(
      <div id='carouselExampleSlidesOnly' class='carousel slide d-inline'  data-ride="carousel" >
     <div class='carousel-inner'>
       <div class='carousel-item carouselimg active' data-interval ='2000'>
         <img src={ca1} class='d-block w-100' alt='newcarousel'/>
           <div class="carousel-caption d-none d-md-block">
              <Link class='btn btn-dark' to={'/'+this.props.text}>{this.props.text}</Link>
            </div>

       </div>
       <div class='carousel-item carouselimg' data-interval = '2000'>
         <img src={ca2} class='d-block w-100' alt='newcarousel'/>
           <div class="carousel-caption d-none d-md-block">
              <Link class='btn btn-dark' to={'/'+this.props.text}>{this.props.text}</Link>
            </div>
       </div>
       <div class='carousel-item carouselimg' data-interval = '2000'>
         <img src={ca3} class='d-block w-100' alt='newcarousel'/>
           <div class="carousel-caption d-none d-md-block">
              <Link class='btn btn-dark' to={'/'+this.props.text}>{this.props.text}</Link>
            </div>
       </div>
       <div class='carousel-item carouselimg' data-interval = '2000'>
         <img src={ca4} class='d-block w-100' alt='newcarousel'/>
           <div class="carousel-caption d-none d-md-block">
              <Link class='btn btn-dark' to={'/'+this.props.text}>{this.props.text}</Link>
            </div>
       </div>
     </div>
   </div>


    );

  }
}

export default CarouselNew;
