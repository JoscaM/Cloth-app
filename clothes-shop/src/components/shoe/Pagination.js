import React,{Component} from 'react'
import PropTypes from 'prop-types';
const propTypes ={
  items: PropTypes.array.isRequired,
  onChangePage : PropTypes.func.isRequired,
  initialPage : PropTypes.number,
  pageSize : PropTypes.number
}
const defaultProps ={
  initialPage : 1,
  pageSize : 12
}

class Pagination extends Component {
  constructor(props){
    super(props)
    this.state = {
      pager :{}
    }
  }
  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
        this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
      // reset page if items array has changed
      if (this.props.items !== prevProps.items) {
          this.setPage(this.props.initialPage);
      }
  }
  setPage(page){
    const {items , pageSize} =this.props;
    var pager = this.state.pager;

    if (page < 1 ||page > pager.totalPage){
      return;
    }

    //get paper object from input data array
    pager = this.getPage(items.length, page, pageSize);// pageSize: number of data in current page
    console.log(pager);
    // get data in current page
    var pageOfItems =   items.slice(pager.startIndex, pager.endIndex+1);
    this.setState({pager : pager});
    this.props.onChangePage(pageOfItems)
  }
  getPage(totalItems, currentPage , pageSize){
    //Set default current page and pageSize
    currentPage = currentPage ||1;
    pageSize = pageSize || 12;

    // calculate total page
    var totalPage = Math.ceil(totalItems / pageSize);
    console.log(totalPage);
    var  startPage , endPage
    if (totalPage < 10) {
      startPage = 1;
      endPage = totalPage;
    }
    else {
      if (currentPage <= 7){
        startPage = 1;
        endPage = 9 ;
      } else if(currentPage +5 >= totalPage){
        startPage = totalPage - 8
        endPage = totalPage
      } else {
        startPage = currentPage - 6;
        endPage = currentPage + 5 ;
      }
    }
      // startIndex :data begin in page, endIndex: the last data in page
      var startIndex = (currentPage -1)*pageSize;
      var endIndex = Math.min(startIndex +pageSize -1 , totalItems -1)

      //create array of page name in pagination [1,2,3,4,5]
      var pages = [...Array((endPage +1) - startPage).keys()].map(i => startPage + i );

      // return object for Pager(in state)
      return {
        totalItems : totalItems,
        currentPage : currentPage,
        pageSize :pageSize,
        totalPage : totalPage ,
        startPage : startPage ,
        endPage : endPage ,
        startIndex : startIndex ,
        endIndex : endIndex ,
        pages : pages
      }
    }





  render(){
    var pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
        // don't display pager if there is only 1 page
        return null;
      }
    return(
      <ul className="pagination mx-auto">
                <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <button className='page-link' onClick={() => this.setPage(1)}>First</button>
                </li>
                <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <button className='page-link' onClick={() => this.setPage(pager.currentPage - 1)}>Previous</button>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={ pager.currentPage === page ? 'page-item active' : 'page-item'}>
                        <button className='page-link' onClick={() => this.setPage(page)}>{page}</button>
                    </li>
                )}
                <li className={ pager.currentPage ===  pager.totalPage ? 'page-item disabled' : 'page-item'}>
                    <button className='page-link' onClick={() => this.setPage(pager.currentPage + 1)}>Next</button>
                </li>
                <li className={ pager.currentPage === pager.totalPage ? 'page-item disabled' : 'page-item'}>
                    <button className='page-link' onClick={() => this.setPage(pager.totalPage)}>Last</button>
                </li>
            </ul>
    );

  }
}
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
