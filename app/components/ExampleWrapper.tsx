import { RegistrationData } from "@/app/types";
import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

interface ExampleWrapperProps {
  hasNextPage:boolean,
  isNextPageLoading:boolean,
  items: RegistrationData[],
  itemsPerPage: number,
  loadNextPage: (startIndex:number, stopIndex:number)=>void
}

export default function ExampleWrapper({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  //Number of items to display Per page
  itemsPerPage,

  // Callback function responsible for loading the next page of items.
  loadNextPage
}:ExampleWrapperProps) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index:number) => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index }:{ index:number}) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = items[index].operator_registration_number;
    }

    return <div>{content}</div>;
  };


  useEffect(()=>{console.log(items)}, [items])

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={150}
          itemCount={itemCount||itemsPerPage}
          itemSize={30}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="95%"
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
}