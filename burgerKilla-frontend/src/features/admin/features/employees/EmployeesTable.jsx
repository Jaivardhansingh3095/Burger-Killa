import { MdError, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import { GrDocumentUpdate } from 'react-icons/gr';
import { IoIosSearch, IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { PiCaretUpDownBold } from 'react-icons/pi';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useEmployees } from './useEmployees';
import LoaderDasher from '../../../../components/LoaderDasher';
import { useEffect, useState } from 'react';
import useOutsideClick from '../../../../hook/useOutsideCllick';
import Modal from '../../../../components/Modal';
import UpdateEmployee from './UpdateEmployee';
import RemoveEmployee from './RemoveEmployee';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('name', {
    header: ({ header }) => {
      // console.log(column.toggleSorting(column.getIsSorted()));

      return (
        <button
          className="flex items-center justify-center w-full gap-1 cursor-pointer"
          // onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {header.column.getIsSorted() === false ? (
            <PiCaretUpDownBold className="w-5 h-5" />
          ) : header.column.getIsSorted() === 'asc' ? (
            <FaArrowUp className="w-5 h-5 " />
          ) : (
            <FaArrowDown className="w-5 h-5 " />
          )}
        </button>
      );
    },
  }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('phone', { header: 'Phone' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('age', {
    header: ({ header }) => {
      return (
        <button className="flex items-center justify-center w-full gap-1 cursor-pointer">
          Age
          {header.column.getIsSorted() === false ? (
            <PiCaretUpDownBold className="w-5 h-5" />
          ) : header.column.getIsSorted() === 'asc' ? (
            <FaArrowUp className="w-5 h-5" />
          ) : (
            <FaArrowDown className="w-5 h-5" />
          )}
        </button>
      );
    },
  }),
  columnHelper.accessor('salary', {
    header: ({ header }) => {
      return (
        <button className="flex items-center justify-center w-full gap-1 cursor-pointer">
          Salary
          {header.column.getIsSorted() === false ? (
            <PiCaretUpDownBold className="w-5 h-5" />
          ) : header.column.getIsSorted() === 'asc' ? (
            <FaArrowUp className="w-5 h-5" />
          ) : (
            <FaArrowDown className="w-5 h-5" />
          )}
        </button>
      );
    },
  }),
  // columnHelper.accessor('actions', { header: () => <span></span> }),
];

function EmployeesTable() {
  const [sorting, setSorting] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [employeesData, setEmployeesData] = useState([]);
  // const [searchParams, setSearchParams] = useSearchParams();
  const { employees, employeesStatus } = useEmployees();

  const table = useReactTable({
    data: employeesData.length ? employeesData : employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
    sortDescFirst: false,
  });

  const [show, setShow] = useState('');
  const { openModal: openUpdate, handleModalClose: handleUpdate } =
    useOutsideClick();
  const { openModal: openRemove, handleModalClose: handleRemove } =
    useOutsideClick();

  useEffect(
    function () {
      if (!employees) return;

      //CLIENT SIDE SORTING
      if (!sorting.length) {
        //  setEmployeesData(() => [...employees]);
        return;
      }
      let { id, desc } = sorting[0];

      if (employees.length) {
        const employeesSort = [...employees];
        employeesSort.sort((a, b) => {
          if (typeof a[id] === 'string') {
            return desc
              ? b[id].localeCompare(a[id])
              : a[id].localeCompare(b[id]);
          }
          return desc ? b[id] - a[id] : a[id] - b[id];
        });
        setEmployeesData(() => [...employeesSort]);
      }

      //SERVER SIDE SORTING
      // if (!sorting.length) {
      //   setSearchParams((prev) => {
      //     const obj = Object.fromEntries(prev);
      //     delete obj.sort;
      //     return { ...obj };
      //   });
      //   return;
      // }

      // if (id === 'age') {
      //   id = 'dob';
      // }
      // setSearchParams((prev) => ({
      //   ...prev,
      //   sort: `${id}:${desc ? 'desc' : 'asc'}`,
      // }));
    },
    [sorting]
  );

  if (employeesStatus === 'pending') {
    return (
      <div className="w-full h-full px-1 py-2">
        <div className="flex flex-col items-center justify-center w-full h-full gap-10 pt-10 pb-5 px-15">
          {/* <div className="mx-auto text-gray-300 border-4 rounded-full w-25 h-25 border-t-primary dark:border-t-primary-dark animate-spin" />
          <span className="text-xl font-semibold text-gray-500">
            Loading...
          </span> */}
          <LoaderDasher />
        </div>
      </div>
    );
  }

  if (employeesStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <MdError className="w-10 h-10 fill-primary dark:fill-primary-dark" />
        <p className="text-xl ">
          Something went wrong. Please try refreshing the page.
        </p>
      </div>
    );
  }

  //console.log(employeesTest);
  // console.log(
  //   table.getRowModel().rows.map((row) =>
  //     row.getVisibleCells().map((cell) => ({
  //       rowName: cell.column.columnDef.cell,
  //       context: cell.getContext(),
  //       id: cell.id,
  //     })),
  //   ),
  // );

  // console.log(sorting);

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-4">
      <div className="flex items-center w-full px-10 justify-evenly">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-white rounded-4xl shadow-[1px_2px_5px_2px] shadow-gray-300 dark:shadow-none">
          <label htmlFor="search">
            <IoIosSearch className="fill-gray-400" />
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name"
            className="p-1 text-sm text-gray-600 outline-none w-60"
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <span className="text-lg font-semibold text-gray-500">Roles:</span>
          <select className="w-30 p-1 text-gray-600 bg-white outline-none shadow-[1px_2px_5px_2px] shadow-gray-300 dark:shadow-none rounded-md ">
            <option>All</option>
            <option>Manager</option>
            <option>Staff</option>
            <option>Delivery</option>
          </select>
        </div>
        <div className="flex items-center justify-center gap-5">
          <span className="text-lg font-semibold text-gray-500">Account:</span>
          <select className="w-25 p-1 text-gray-600 bg-white outline-none shadow-[1px_2px_5px_2px] shadow-gray-300 dark:shadow-none rounded-md ">
            <option>Active</option>
            <option>Removed</option>
          </select>
        </div>

        {/* <div className="flex items-center justify-center gap-5">
          <span className="text-lg font-semibold text-gray-500">Sort:</span>
          <select className="w-32 p-1 text-gray-600 bg-white outline-none shadow-[1px_2px_5px_2px] shadow-gray-300 dark:shadow-none rounded-md ">
            <option>Default</option>
            <option>Youngest</option>
            <option>Oldest</option>
            <option>Highest paid</option>
            <option>Lowest paid</option>
          </select>
        </div> */}
      </div>
      <table className="w-full h-full p-1 overflow-y-auto bg-white border-gray-200 border-3 lg:overflow-x-auto">
        <thead className="tracking-wider text-white ">
          {table.getHeaderGroups().map((hg) => (
            <tr
              key={hg.id}
              className="shadow-[0px_3px_4px_0px] shadow-gray-400"
            >
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className={`py-3 text-shadow-2xs text-shadow-amber-900 bg-primary dark:bg-primary-dark ${
                    header.id === 'name' ||
                    header.id === 'salary' ||
                    header.id === 'age'
                      ? 'cursor-pointer hover:bg-amber-600/90 dark:hover:bg-primary-dark/70'
                      : ''
                  }`}
                  onClick={(e) => {
                    if (['name', 'age', 'salary'].includes(header.id)) {
                      //getToggleSortingHandler() return a new function and we calling  that return func
                      header.column.getToggleSortingHandler()(e);
                    }
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th className="bg-primary dark:bg-primary-dark"></th>
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="z-10">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={` text-center ${cell.id.includes('role') ? (cell.getValue() === 'Manager' ? 'text-green-500 font-bold' : cell.getValue() === 'Staff' ? 'text-purple-500 font-bold' : cell.getValue() === 'Delivery' ? 'text-blue-500 font-bold' : 'text-gray-600') : 'text-gray-600'}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td
                key="0actions"
                className="relative flex items-center justify-center h-full px-2"
              >
                <span
                  role="button"
                  onClick={() =>
                    setShow((prev) => {
                      if (prev === row.original.id) return '';
                      return row.original.id;
                    })
                  }
                  className="flex items-center justify-center p-2  bg-white cursor-pointer hover:shadow-[1px_3px_5px_2px] hover:shadow-gray-300 rounded-lg transition-shadow duration-300 ease-linear"
                >
                  <TiThMenu className="w-4 h-4 fill-primary dark:fill-primary-dark" />
                </span>
                {show === row.original.id ? (
                  <div className="absolute top-[60%] -left-[60%] bg-white border-3 border-gray-400 rounded-md z-100 gap-1 flex flex-col justify-center items-center">
                    <span
                      onClick={() => {
                        handleUpdate();
                        setShow('');
                      }}
                      className="flex items-center justify-center gap-1 p-3 text-sm font-semibold transition-colors duration-300 ease-linear cursor-pointer hover:bg-gray-200"
                    >
                      <GrDocumentUpdate className="text-green-500" />
                      <span className="text-green-500">Update</span>
                    </span>
                    <span
                      onClick={() => {
                        handleRemove();
                        setShow('');
                      }}
                      className="flex items-center justify-center gap-1 p-3 text-sm font-semibold text-red-500 transition-colors duration-300 ease-linear cursor-pointer hover:bg-gray-200"
                    >
                      <MdOutlineRemoveCircleOutline className="" />
                      <span className="">Remove</span>
                    </span>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center w-full gap-10">
        <button className="px-5 py-2 font-bold tracking-wider text-white rounded-md bg-primary dark:bg-primary-dark shadow-[0px_2px_5px_1px] shadow-amber-900 dark:shadow-none hover:bg-orange-500/85 dark:hover:bg-primary-dark/80 cursor-pointer transition-all duration-300 ease-linear text-shadow-2xs text-shadow-amber-900">
          prev
        </button>
        <div>Pages</div>
        <button className="px-5 py-2 font-bold tracking-wider text-white rounded-md bg-primary dark:bg-primary-dark shadow-[0px_2px_5px_1px] shadow-amber-900 dark:shadow-none hover:bg-orange-500/85 dark:hover:bg-primary-dark/80 cursor-pointer transition-all duration-300 ease-linear text-shadow-2xs text-shadow-amber-900">
          next
        </button>
      </div>
      {openUpdate && (
        <Modal open={openUpdate} onModalClose={handleUpdate}>
          <UpdateEmployee handleUpdate={handleUpdate} />
        </Modal>
      )}
      {openRemove && (
        <Modal open={openRemove} onModalClose={handleRemove}>
          <RemoveEmployee handleUpdate={handleRemove} />
        </Modal>
      )}
    </div>
  );
}

export default EmployeesTable;
