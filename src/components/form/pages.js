import React from 'react';
import { FormContext } from './context';


// A container that attaches useful props to each Page.
class Pages extends React.Component {
  static contextType = FormContext;

  render() {
    const currentPageIndex = this.context.currentPageIndex;

    return (
      <div className={`${this.context.classPrefix}__pages`}>
        {React.Children.map(this.props.children, (page, index) => page === null ? <></> : React.cloneElement(page, {
          key: index,
          pageIndex: index,
          isCurrentPage: index === currentPageIndex,
          isNextPage: index === currentPageIndex + 1,
          isPreviousPage: index === currentPageIndex - 1,
          isValid: (this.context.pages[currentPageIndex] || {isValid: false}).isValid,
          registerPage: this.context.registerPage,
        }))}
      </div>
    );
  }
}

export default Pages;
