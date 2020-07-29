import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";

export default class CustomPagination extends Component{
    constructor(props) {
        super(props);
    }

    generatePages(leftLimit, rightLimit) {
        let items = [];
        for (let number = leftLimit; number <= rightLimit; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === parseInt(this.props.page)}
                    onClick={() => this.props.changePage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    }

    closestFivePages() {
        let actualPage = parseInt(this.props.page);
        if (actualPage === 1 || actualPage === 2) {
            return this.generatePages(1, 5);
        } else if (actualPage > this.props.totalPages - 2) {
            return this.generatePages(
                this.props.totalPages - 4,
                this.props.totalPages
            );
        } else {
            return this.generatePages(this.props.page - 2, this.props.page + 2);
        }
    }

    rightItems(currentPage) {
        let nextItems = [];
        const netxItem = (
            <Pagination.Next
                disabled={currentPage === this.props.totalPages}
                onClick={() => this.changePage(currentPage + 1)}
            />
        );
        if (currentPage <= this.props.totalPages - 5) {
            nextItems.push(<Pagination.Ellipsis />);
            nextItems.push(
                <Pagination.Item onClick={() => this.props.changePage(this.props.totalPages)}>
                    {this.props.totalPages}
                </Pagination.Item>
            );
        }

        nextItems.push(netxItem);
        return nextItems;
    }

    leftItems(currentPage) {
        let prevItems = [];
        const prevItem = (
            <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => this.props.changePage(currentPage - 1)}
            />
        );
        prevItems.push(prevItem);
        if (currentPage >= 5) {
            prevItems.push(
                <Pagination.Item onClick={() => this.props.changePage(1)}>
                    {1}
                </Pagination.Item>
            );
            prevItems.push(<Pagination.Ellipsis />);
        }
        return prevItems;
    }

    render() {
        const closestPages = this.closestFivePages();
        const currentPage = parseInt(this.props.page);
        const leftItems = this.leftItems(currentPage);
        const rightItems = this.rightItems(currentPage);
        return (
            <Pagination className="justify-content-center">
                {leftItems}
                {closestPages}
                {rightItems}
            </Pagination>
        );
    }
}