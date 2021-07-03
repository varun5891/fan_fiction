import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import logo from '../../logo.svg';
import image from '../../Images/Play.jpg';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/styles';
import Ratings from "../Ratings/Ratings";
import { getAllWork } from "../../Services/Work/Work_Service";
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    root: {

        '& .GridCells': {
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            backgroundColor: '#faebd7',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.negative': {
            backgroundColor: '#faebd7',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app-theme--header': {
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
            '&:hover': {
                backgroundColor: '#faebd7',
              },
        },
    },
});



// const rows = [
//     {
//         id: 1,
//         description: `What is Lorem Ipsum?
//         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
//         author: "Varun Patel",
//         img: image,
//     },
//     {
//         id: 2,
//         description: `Why do we use it?
//         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
//         The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
//         making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
//         and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
//         sometimes by accident, sometimes on purpose (injected humour and the like).`,
//         author: "Cristiano Ronaldo",
//         img: image,
//     },
//     {
//         id: 3,
//         description: `Why do we use it?
//         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
//         The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
//         making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
//         and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
//         sometimes by accident, sometimes on purpose (injected humour and the like).`,
//         author: "Valentino Rossi",
//         img: image,
//     }
// ];


export default function AllWork(props) {
    const {
        loggedInUser,
        selectedUser
    } = props;

    const classes = useStyles();
    const [rows, setRows] = React.useState([]);

    const columns = [
        {
            field: "title",
            headerName: "Title",
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            cellClassName: 'GridCells',
        },
        {
            field: "img",
            headerName: "Image",
            headerClassName: 'super-app-theme--header',
            flex: 0.27,
            cellClassName: 'GridCells',
            renderCell: (params) => {
                return (
                    <img src={image} />
                )

            }
        },
        {
            field: "description",
            headerName: "Description",
            headerClassName: 'super-app-theme--header',
            flex: 0.40,
            cellClassName: 'GridCells',
            renderCell: (params) => {
                return (
                    <Typography>{params.row.description}</Typography>
                )

            }
        },
        {
            field: "rating",
            headerName: "Rating",
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            cellClassName: 'GridCells',

            renderCell: (params) => {
                return (
                    <Ratings row={params.row} rating={params.row.rating} loggedInUser={loggedInUser} selectedUser={selectedUser} />
                )
            }
        },
        {
            field: "author",
            headerName: "Author",
            headerClassName: 'super-app-theme--header',
            flex: 0.10,
            cellClassName: 'GridCells',
        },

    ];

    
    const onUserSelection = (user) =>{
        selectedUser(user)
    };

    const onMount = () => {
        getAllWork().then((resp) => {
            if (resp.data.status === 200) {
                setRows(resp.data.work);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${resp.data.message}`,
                })
            }
        })
    };

    useEffect(onMount, []);

    return (

        <div style={{ height: 400, width: "100%" }} className={classes.root}>
            <DataGrid
                rowHeight={300}
                autoHeight={true}
                rows={rows}
                columns={columns}
                disableSelectionOnClick={loggedInUser.username !== 'admin'}
                disableMultipleSelection={true}
                isRowSelectable={(params) => {
                    onUserSelection(params.row.username);
                }
                }
            />
        </div>
    );
}

