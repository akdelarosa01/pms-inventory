import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosClient from "../../axios-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Box,
    Flex,
    HStack,
    Button,
    useColorModeValue,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
    Select,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";

export default function InventoryList() {

	const mySwal = withReactContent(Swal);
    const [items, setItems] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const [category, setCategory] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [search, setSearch] = useState("");
    const [editID, setEditID] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    let filteredItem = [];
    const options = [
        { value: "RAW MATERIAL", text: "Raw Material" },
        { value: "FINISHED GOODS", text: "Finished Goods" },
        { value: "CRUDE", text: "Crude" },
    ];

    const colObj = [
        {
            cell: (row) => (
                <IconButton
                    colorScheme="blue"
                    aria-label="Edit Item"
                    size="sm"
                    variant={'outline'}
                    borderRadius="0px"
                    onClick={() => handlesFormModal('EDIT', row.id)}
                    icon={<EditIcon />}
                />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            name: "",
            width: "40px",
            selector: (row) => row.id,
        },
        {
            id: "item_category",
            name: "Category",
            width: "140px",
            sortable: true,
            selector: (row) => row.item_category,
        },
        {
            id: "item_type",
            name: "Item Type",
            width: "200px",
            sortable: true,
            selector: (row) => row.item_type,
        },
        {
            id: "item_code",
            name: "Item Code",
            width: "150px",
            sortable: true,
            selector: (row) => row.item_code,
        },
        {
            id: "item_desc",
            name: "Description",
            width: "300px",
            sortable: true,
            selector: (row) => row.item_desc,
        },
        {
            id: "quantity",
            name: "Quantity",
            width: "200px",
            sortable: true,
            selector: (row) => row.quantity,
        },
        {
            id: "warehouse",
            name: "Warehouse",
            width: "200px",
            sortable: true,
            selector: (row) => row.quantity,
        },
        {
            id: "length",
            name: "Length",
            width: "150px",
            sortable: true,
            selector: (row) => row.length,
        },
        {
            id: "width",
            name: "Width",
            sortable: true,
            selector: (row) => row.width,
        },
        {
            id: "updated_at",
            name: "Updated at",
            width: "180px",
            sortable: true,
            selector: (row) => row.updated_at,
        },
    ];

    const msgHandler = (data) => {
        switch (data.status) {
            case "success":
                toast({
                    title: "Success",
                    description: data.message,
                    status: data.status,
                    position: "top",
                    variant: "subtle",
                    isClosable: true,
                });
                break;
            case "warning":
                toast({
                    title: "Warning",
                    description: data.message,
                    status: data.status,
                    position: "top",
                    variant: "subtle",
                    isClosable: true,
                });
                break;

            case "error":
                toast({
                    title: "Error",
                    description: data.message,
                    status: data.status,
                    position: "top",
                    variant: "subtle",
                    isClosable: true,
                });
                break;

            default:
                break;
        }
    };

    const getInventoryList = async () => {
        await axiosClient.get("/inventories")
            .then(({ data }) => {
                setItems(data);
                console.log(data);
            })
            .catch(({ err }) => {
                console.log(err);
            })
            .then(() => {
                setPending(false);
            });
    }

    useEffect(() => {
        setColumns(colObj);

        setPending(true);
        getInventoryList();

    }, []);

    const handleSelectRow = (state) => {
        setSelectedData(state.selectedRows);
    };

    const deleteItem = () => {
        const id = [];

        selectedData.map((sdata) => {
            id.push(sdata.id);
        });

        if (id.length > 0) {

            mySwal.fire({
                    title: "Do you want to delete these Items?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    denyButtonText: `No`,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        
                        try {
                            setLoading(true);
                            axiosClient
                                .delete("/items-delete", { params: id })
                                .then((response) => {
                                    try {
                                        msgHandler(response.data);
                                        setItems(response.data.data);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                })
                                .catch((err) => {
                                    console.log(err.response);
                                    const response = err.response;
                                }).then(() => {
                                    setLoading(false);
                                });
                        } catch (error) {
                            console.log(error);
                        }
                        
                    } else if (result.isDenied) {
                        Swal.fire("You chose not to delete the item.", "", "info");
                    }
                });
        } else {
            msgHandler({
                message: "Please select at least 1 Item.",
                status: 'warning'
            });
        }
    };

    const handleCategory = (e) => {
        const categ = e.target.value.toLocaleLowerCase();
        setCategory(categ);
    };

    const handleWarehouse = (e) => {
        const whs = e.target.value.toLocaleLowerCase();
        setWarehouse(whs);
    };

    const handleSearch = (e) => {
        const ss = e.target.value.toLocaleLowerCase();
        setSearch(ss);
    };

    const handlesFormModal = (mode, id = null) => {
        if (mode != 'ADD') {
            setEditID(id);
        }
        onOpen();
    }

    filteredItem = items.filter((i) => {
        let item_type = i.item_type != null ? i.item_type : "";
        let item_desc = i.item_desc != null ? i.item_desc : "";
        let item = i.item != null ? i.item : "";
       
        let itemArr = i.item_category.toLocaleLowerCase().includes(category) &&
            (item_type.toLocaleLowerCase().includes(search) ||
                item_desc.toLocaleLowerCase().includes(search) ||
                item.toLocaleLowerCase().includes(search));

        return itemArr;
    });

    return (
		<div>
			<Box bg={"white"} boxShadow="xs" py="1">
                <Flex
                    px={{ base: 4 }}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.900")}
                    align={"center"}
                >

                    <HStack
                        flex={{ base: 10, lg: 1 }}
                        direction={"row"}
                        spacing={2}
                        justify={"flex-start"}
                    >
                        <Text
                            fontFamily={"heading"}
                            fontWeight={500}
                            minW={"130px"}
                        >
                            Inventory List
                        </Text>

                        <IconButton
                            as={Link}
                            variant={"outline"}
                            colorScheme={"blue"}
                            borderRadius={"0px"}
                            aria-label="Add Item"
                            size="sm"
                            title="Click this buton to add another Inventory Item"
                            to="/inventories/new"
                            icon={<AddIcon />}
                            isLoading={loading} 
                            spinnerPlacement='end'
                        />
                        <IconButton
                            variant={"outline"}
                            colorScheme={"red"}
                            borderRadius={"0px"}
                            aria-label="Delete Item"
                            size="sm"
                            title="Click this buton to delete Items"
                            icon={<DeleteIcon />}
                            isLoading={loading} 
                            spinnerPlacement='end'
                        />
                        <Select
                            placeholder="Select Category"
                            size="sm"
                            onChange={handleCategory}
                        >
                            {options.map((option) => (
                                <option key={option.text} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Select Warehouse"
                            size="sm"
                            onChange={handleWarehouse}
                        >
                            {options.map((option) => (
                                <option key={option.text} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </Select>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input
                                type="text"
                                placeholder="Search Item"
                                size={"sm"}
                                w={"100%"}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                    </HStack>
                </Flex>
            </Box>

            <Box pt={1}>
                <DataTable
                    columns={columns}
                    data={filteredItem}
                    progressPending={pending}
                    pagination
                    selectableRows
                    responsive
                    striped
                    dense
                    paginationPerPage={20}
                    defaultSortFieldId="updated_at"
                    defaultSortAsc={true}
                    onSelectedRowsChange={handleSelectRow}
                />
            </Box>
		</div>
	);
}
