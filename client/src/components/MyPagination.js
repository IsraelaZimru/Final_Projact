import { useEffect, useState } from "react";
import { Pagination, Row } from "react-bootstrap";

const MyPagination = ({ recipesPerPage, totalRecipes, paginate, active }) => {
    const pageNumbers = [];

    // useEffect(() => {
    // }, [active])

    const updatePage = (numPage) => {
        paginate(numPage)
    }

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(
            <Pagination.Item
                key={i}
                onClick={() => updatePage(i)}
                active={i === active}>
                {i}
            </Pagination.Item>
        )
    }

    return <Row className="justify-content-center">
        <Pagination>{pageNumbers}</Pagination>
    </Row>
}

export default MyPagination;