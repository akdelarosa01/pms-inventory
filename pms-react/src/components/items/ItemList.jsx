import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosClient from "../../axios-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ItemForm from "./ItemForm";
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


export default function ItemList() {
    const mySwal = withReactContent(Swal);
    const [items, setItems] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const [category, setCategory] = useState("");
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
            id: "item",
            name: "Item",
            width: "200px",
            sortable: true,
            selector: (row) => row.item,
        },
        {
            id: "schedule_class",
            name: "Schedule / Class",
            width: "150px",
            sortable: true,
            selector: (row) => row.schedule_class,
        },
        {
            id: "alloy",
            name: "Alloy",
            sortable: true,
            selector: (row) => row.alloy,
        },
        {
            id: "size",
            name: "Size",
            sortable: true,
            width: "150px",
            selector: (row) => row.size,
        },
        {
            id: "weight",
            name: "Weight",
            sortable: true,
            selector: (row) => row.weight,
        },
        {
            id: "cut_weight",
            name: "Cut Weight",
            width: "120px",
            sortable: true,
            selector: (row) => row.cut_weight,
        },
        {
            id: "cut_length",
            name: "Cut Length",
            width: "120px",
            sortable: true,
            selector: (row) => row.cut_length,
        },
        {
            id: "cut_width",
            name: "Cut Width",
            width: "120px",
            sortable: true,
            selector: (row) => row.cut_width,
        },
        {
            id: "std_material_used",
            name: "Std. Material Used",
            width: "180px",
            sortable: true,
            selector: (row) => row.std_material_used,
        },
        {
            id: "finished_code",
            name: "Finished Code",
            width: "150px",
            sortable: true,
            selector: (row) => row.finished_code,
        },
        {
            id: "finished_desc",
            name: "Finished Description",
            width: "280px",
            sortable: true,
            selector: (row) => row.finished_desc,
        },
        {
            id: "update_user",
            name: "Updated By",
            width: "150px",
            sortable: true,
            selector: (row) => row.update_user,
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

    const getItemList = async () => {
        await axiosClient.get("/items")
            .then(({ data }) => {
                setItems(data);
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
        getItemList();

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
        let schedule_class = i.schedule_class != null ? i.schedule_class : "";
        let alloy = i.alloy != null ? i.alloy : "";
        let size = i.size != null ? i.size : "";
        let weight = i.weight != null ? i.weight : "";
        let cut_weight = i.cut_weight != null ? i.cut_weight : "";
        let cut_length = i.cut_length != null ? i.cut_length : "";
        let cut_width = i.cut_width != null ? i.cut_width : "";
        let std_material_used = i.std_material_used != null ? i.std_material_used : "";
        let finished_code = i.finished_code != null ? i.finished_code : "";
        let finished_desc = i.finished_desc != null ? i.finished_desc : "";
        let itemArr = i.item_category.toLocaleLowerCase().includes(category) &&
            (item_type.toLocaleLowerCase().includes(search) ||
                item_desc.toLocaleLowerCase().includes(search) ||
                item.toLocaleLowerCase().includes(search) ||
                schedule_class.toLocaleLowerCase().includes(search) ||
                alloy.toLocaleLowerCase().includes(search) ||
                size.toLocaleLowerCase().includes(search) ||
                std_material_used.toLocaleLowerCase().includes(search) ||
                finished_code.toLocaleLowerCase().includes(search) ||
                finished_desc.toLocaleLowerCase().includes(search));

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
                    <Flex
                        flex={{ base: 1 }}
                        justify={{ base: "center", md: "start" }}
                    >
                        <HStack
                            flex={{ base: 4, md: 0 }}
                            justify={"flex-start"}
                            direction={"row"}
                            spacing={1}
                        >
                            <Text
                                fontFamily={"heading"}
                                fontWeight={500}
                                minW={"70px"}
                            >
                                Item List
                            </Text>
                        </HStack>
                    </Flex>

                    <HStack
                        flex={{ base: 10, lg: 1 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={2}
                    >
                        <IconButton
                            variant={"outline"}
                            colorScheme={"blue"}
                            borderRadius={"0px"}
                            aria-label="Add Item"
                            size="sm"
                            title="Click this buton to add an Item"
                            onClick={() => handlesFormModal('ADD')}
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
                            onClick={deleteItem}
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
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input
                                type="tel"
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
            <Modal onClose={onClose} size={'full'} isOpen={isOpen} borderRadius={"0px"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add / Edit Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ItemForm editID={editID} onDateUpdate={setItems}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            variant={"outline"}
                            colorScheme={"red"}
                            borderRadius={"0px"}
                            size={"sm"}
                            onClick={onClose}
                        >Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
