import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BarChartIcon from "@material-ui/icons/BarChart";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Link from '@material-ui/core/Link';
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import ApplicationReviewTable from "../components/ApplicationReviewTable";
import Copyright from '../components/Copyright'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useHistory} from "react-router";
import axios from 'axios'
import lodash from 'lodash'
var veriler = [{},];
export default function AcademicianEditPage(){

    const drawerWidth = 270;
   
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            backgroundColor:'#f3efec'
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        },
    }));

    const mainListItems = (
        <div>
            <RouterLink to="/dashboard">
                <ListItem button >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="İntibak Başvuruları" />
                </ListItem>
            </RouterLink>
            <RouterLink to="/dashboard/akademisyenduzenle">
                <ListItem button >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Akademisyen Düzenleme" />
                </ListItem>
            </RouterLink>
            <RouterLink to="/dashboard/dersduzenle">
                <ListItem button>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ders Düzenleme" />
                </ListItem>
            </RouterLink>
            <RouterLink to="/dashboard/dershavuzu">
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ders Havuzu" />
                </ListItem>
            </RouterLink>
        </div>
    );
    const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
    const [openV, setOpenV] = React.useState(false);
    const theme = useTheme();
    const fullScreenV = useMediaQuery(theme.breakpoints.down('sm'));
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [state, setState] = React.useState({
        columns: [
            { title: 'Unvan', field: 'unvan' },
            { title: 'Adı', field: 'ad' },
            { title: 'Soyadı', field: 'soyad' },
            { title: 'Statü', field: 'statu' },
        ],
        data: [
            { unvan:'',ad: '', soyad: '', statu:'' },
        ],
    });
    
    React.useEffect(() => {
        axios.get('http://localhost:3004/ogretimElemanlari').then(response => {
            veriler = response.data
            setState({
                columns: [
                    { title: 'Unvan', field: 'unvan' },
                    { title: 'Adı', field: 'ad' },
                    { title: 'Soyadı', field: 'soyad' },
                    { title: 'Statü', field: 'statu' },

                ],
                data: response.data,
            })
            
        }).catch(err => console.log(err));
    }, []);
    const handleClickOpenV = () => {
        setOpenV(true);
    };

    const handleCloseV = () => {
        setOpenV(false);
    };

    const dialogOpen = () => {
        setSaveDialogOpen(true);
    }

    const dialogClose = () => {
        setSaveDialogOpen(false);
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const history = useHistory();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" style={{backgroundColor: "#457b9d"}} className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        FSMVÜ İntibak, Akademisyen ve Ders Yönetim Sistemi
                    </Typography>
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <ExitToAppIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="App">
                                <MaterialTable
                                    title="Akademisyen Listesi"
                                    columns={state.columns}
                                    data={state.data}
                                    editable={{
                                        onRowAdd: (newData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data.push(newData);
                                                        return { ...prevState, data };
                                                    });
                                                }, 600);
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    if (oldData) {
                                                        setState((prevState) => {
                                                            const data = [...prevState.data];
                                                            data[data.indexOf(oldData)] = newData;
                                                            return { ...prevState, data };
                                                        });
                                                    }
                                                }, 600);
                                            }),
                                        onRowDelete: (oldData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data.splice(data.indexOf(oldData), 1);
                                                        return { ...prevState, data };
                                                    });
                                                }, 600);
                                            }),
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div style={{float:'left'}}>
                                <Button variant="contained" color="primary" size="medium" onClick={handleClickOpenV}>
                                    Varsayılana Dön
                                </Button>
                                <Dialog
                                    fullScreen={fullScreenV}
                                    open={openV}
                                    onClose={handleCloseV}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle id="responsive-dialog-title">{"Varsayılana Dönülsün mü?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Varsayılana dönmek istediğinize emin misiniz?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus variant="outlined" onClick={handleCloseV} color="primary">
                                            İptal
                                        </Button>
                                        <Button variant="outlined" onClick={handleCloseV} color="primary" autoFocus>
                                            Varsayılana Dön
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                        <Grid item sm={8}>
                        </Grid>
                        <Grid item sm={2}>
                            <div style={{float:'right'}}>
                                <Button variant="contained" color="primary" size="medium" onClick={dialogOpen}>
                                    Kaydet
                                </Button>
                                <Dialog
                                    fullScreen={fullScreen}
                                    open={saveDialogOpen}
                                    onClose={dialogClose}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle id="responsive-dialog-title">{"Değişiklikler Kaydedilsin mi?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Kaydetmek istediğinize emin misiniz?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus variant="outlined" onClick={dialogClose} color="primary">
                                            İptal
                                        </Button>
                                        <Button variant="outlined" 
                                        //onClick={dialogClose} 
                                        color="primary" autoFocus
                                        //onClick={
                                            // () => {
                                            //     //insert kısmı
                                            //     var eklenenler = []
                                            //     var guncellenecek = []
                                            
                                            //     Object.keys(state.data).forEach(key => {
                                            //         if ((state.data)[key].id === undefined) {
                                            //             eklenenler.push((state.data)[key])
                                            //         }
                                            //     })
                                            //     var obje = [{ inserts: eklenenler }]

                                            //     //update kısmı
                                            //     var serialized_Items_Prev = veriler.map(i => JSON.stringify(i));
                                            //     var degisenler = (state.data).filter(i => !serialized_Items_Prev.includes(JSON.stringify(i)));
                                            //     guncellenecek = degisenler.filter((e) => !(obje[0].inserts).includes(e));
                                            //     var updated = { updates: guncellenecek } //update olanlar eklendi.
                                            //     obje.push(updated)

                                            //     //delete kısmı
                                            //     var c = lodash.differenceWith(veriler, state.data, function (o1, o2) {
                                            //         return o1['id'] === o2['id']
                                            //     });
                                            //     var deleted = { deletes: c } //silinenler eklendi
                                            //     obje.push(deleted)

                                            //     //gormek için ekrana yazdırdım
                                            //     console.log(obje);
                                            //     console.log(obje[0]);//insert listesi
                                            //     console.log(obje[1]);//update listesi
                                            //     console.log(obje[2]);//delete listesi

                                            //     //veritabanına gönderme kısmı
                                            //     axios.post('http://localhost:3004/akademisyenDuzenle', obje)
                                            //         .then(response => {
                                            //             console.log(response);
                                            //         }).catch(err => console.log(err))

                                            //         //window.location.reload(true); //sayfanın yenilenmesi gerekiyor
                                                   
                                            //        history.push('/dashboard/akademisyenduzenle',true) 
                                            //        history.go(0) //sayfayı yenilemek için
                                                   
                                         
                                            //     dialogClose()
                                            // }
                                           
                                        //}
                                        >
                                            Kaydet
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>

    );
}

