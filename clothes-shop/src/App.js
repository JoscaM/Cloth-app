import React,{Component} from 'react';
import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import CarouselNew    from './components/carousel/carouselNew';

class App extends Component {
  render()
{  return (
    <div className="Apps" >
      <Header />
      <div class='container-fluid px-0'>
        <div class=' row carouseldiv mx-0'>
          <div class='col-6 px-0'>
            <CarouselNew text='New' />
          </div>
          <div class='col-6 px-0'>
            <CarouselNew text='Jacket' />
          </div>
        </div>
        <div class=' row carouseldiv mx-auto'>
          <div class='col-6  px-0'>
            <CarouselNew text='Accessories' />
          </div>
          <div class='col-6 px-0'>
            <CarouselNew text='Shoe' />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );}

}

export default App;
