import React, { useState, useEffect } from "react";
import "./styles.css";
import { Box, Table as MuiTable } from "@material-ui/core";
import { TableCell, TableHead, TableRow, TableBody } from "@material-ui/core";

export default function App() {
  const [dragginIndex, setDraggingIndex] = useState(null);
  const [columnsOrder, setColumnsOrder] = useState([
    "name",
    "surname",
    "country",
    "city"
  ]);
  const columns = [
    {
      name: "name",
      id: 1
    },
    {
      name: "surname",
      id: 2
    },
    {
      name: "country",
      id: 3
    },
    {
      name: "city",
      id: 4
    }
  ];
  const users = [
    {
      id: 1,
      name: "name 1",
      surname: "surname 1",
      city: "Moscow",
      country: "Russia"
    },
    {
      id: 2,
      name: "name 2",
      surname: "surname 2",
      city: "Colombo",
      country: "Sri-lanka"
    },
    {
      id: 3,
      name: "name 3",
      surname: "surname 3",
      city: "New Delhi",
      country: "India"
    }
  ];
  const getIndex = (event) => {
    const getParentIndex = (target) => {
      if (target.dataset.index === undefined) {
        return parseFloat(getParentIndex(target.parentElement));
      }
      return parseFloat(target.dataset.index);
    };
    return getParentIndex(event.target);
  };
  const DragStartHandle = (event) => {
    setDraggingIndex(event.target.dataset.index);
    event.target.classList.add("dragging");
  };
  const DragEndHandle = (event) => {
    event.target.classList.remove("dragging");
  };
  const onDragOverHandle = (event) => {
    event.preventDefault();
    // console.log(event)
  };
  const OnDropHandle = (event) => {
    const dropIndex = getIndex(event);
    const columnsOrderCopy = [...columnsOrder];
    columnsOrderCopy.splice(dragginIndex, 1);
    columnsOrderCopy.splice(dropIndex, 0, columnsOrder[dragginIndex]);
    setColumnsOrder(columnsOrderCopy);
  };
  const buttonClickHandle = (event) => {
    console.log("button-working-", event.target.innerText);
  };

  useEffect(() => {
    //save_new_table_order_in_user
    // console.log("new column order", columnsOrder);
  }, [columnsOrder]);

  const formatData = (user, column) => {
    return user[column.name];
  };

  const MouseUpHandle = (event) => {
    // console.log(event)
  };

  const MouseDownHandle = (event) => {
    // console.log(event)
  };
  return (
    <Box>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns
              .sort(
                (a, b) =>
                  columnsOrder.indexOf(a.name) - columnsOrder.indexOf(b.name)
              )
              .map((column, index) => (
                <TableCell
                  draggable
                  onDragStart={DragStartHandle}
                  onDragEnd={DragEndHandle}
                  onDragOver={onDragOverHandle}
                  onDrop={OnDropHandle}
                  key={column.name}
                  data-index={index}
                >
                  <button onClick={buttonClickHandle}>{column.name}</button>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              {columns
                .sort(
                  (a, b) =>
                    columnsOrder.indexOf(a.name) - columnsOrder.indexOf(b.name)
                )
                .map((column) => {
                  return (
                    <TableCell key={column.name}>
                      {formatData(user, column)}
                    </TableCell>
                  );
                })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </Box>
  );
}
