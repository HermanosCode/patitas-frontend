import ReactPaginate from 'react-paginate';
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import "./Styles/Pagination.scss"

export const Pagination = ({ handlePageClick, totalPage }: { handlePageClick: (data: { selected: number }) => void, totalPage: number }) => {
  return (
    <ReactPaginate
      containerClassName='pagination'
      pageClassName="page-num"
      activeClassName="active"
      previousLinkClassName='arrow'
      nextLinkClassName='arrow'
      breakLabel="..."
      nextLabel={
        <BsChevronRight />
      }
      onPageChange={(data) => handlePageClick(data)} 
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={totalPage}
      previousLabel={
        <BsChevronLeft />
      }
      renderOnZeroPageCount={null}
    />
  )
}
