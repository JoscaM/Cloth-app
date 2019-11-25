import React,{Component} from 'react'
function importAll(r) {
    let images = {};
    r.keys().map((item) => {return images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../img/shoe', false, /\.jpg$/));
class tableRow extends Component {
  constructor(props){
    super(props)
    this.handelDecrease = this.handelDecrease.bind(this);
    this.handelIncrease = this.handelIncrease.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state= {
      value : 1
    }
  }
  componentDidMount(){
    this.props.onRecieveTotal(this.props.obj._id,this.props.obj.price, this.state.value)
  }
  handelDecrease(){
    if (this.state.value>0){
    this.setState({value : this.state.value -1})
    this.props.onRecieveTotal(this.props.obj._id,this.props.obj.price, this.state.value-1)
    }
    else {
      const controlDecreaseBtn = document.getElementById('decreasebtn')
      controlDecreaseBtn.classList.add('disable')
    }
  }
  handelIncrease(){
    this.setState({value : this.state.value +1})
    this.props.onRecieveTotal(this.props.obj._id,this.props.obj.price, this.state.value+1)
  }
  handleClick(e){
    let id = this.props.obj._id;
    this.props.onRecieveTotal(this.props.obj._id,this.props.obj.price, 0);
    this.props.handleRemove(id)
  }

  render(){
    //console.log(this.props);
    return(
        <tr id={this.props.obj._id}>
          <th className='align-middle' scope="row"><span>{this.props.obj._id}</span></th>
          <td className='align-middle'><img class ='checkout' src ={images[this.props.obj.img]} alt ='...' /></td>
          <td className='align-middle'><span>{this.props.obj.price}</span></td>
          <td className='align-middle'>
            <div>
              <button className='bnt bnt-light' id='decreasebtn'onClick={this.handelDecrease}>-</button>
              <input type='number' className='w-25 mx-2' value={this.state.value}/>
              <button className='bnt bnt-light' onClick={this.handelIncrease}>+</button>
            </div>
          </td>
          <td className='align-middle'>
              <button onClick={this.handleClick} type="submit" className="btn btn-danger"><span>Delete</span></button>
          </td>
      </tr>
    );
  }
}

export default tableRow;
