/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import MaterialTable from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import { useHistory } from 'react-router';

function ProductTable(prop) {
  const history = useHistory();
  return (
    <MaterialTable
      icons={{
        Check: Check,
        DetailPanel: ChevronRight,
        Export: SaveAlt,
        Filter: FilterList,
        FirstPage: FirstPage,
        LastPage: LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft,
        Search: Search,
        ThirdStateCheck: Remove,
        ResetSearch: Clear,
        SortArrow: ArrowDownward,
      }}
      title={prop.title}
      columns={prop.columns}
      data={prop.products}
      options={{ pageSize: 20 }}
      onRowClick={(event, rowData) =>
        history.push({
          pathname: '/product',
          state: { productId: rowData.id },
        })
      }
    />
  );
}

export default ProductTable;
