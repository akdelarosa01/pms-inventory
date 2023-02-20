import { useEffect, useRef, useState,useCallback } from "react";
import axiosClient from "../../axios-client";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Container,
    Box,
    Input,
    Select,
    Textarea,
    Button,
    Stack,
    Skeleton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast
  } from '@chakra-ui/react';
  import { CheckIcon, RepeatIcon } from "@chakra-ui/icons";



export default function ItemForm(props) {
    const options = [
        { value: 'RAW MATERIAL', text: 'Raw Material', color: "color: #444444"},
        { value: 'FINISHED GOODS', text: 'Finished Goods', color: "color: #444444"},
        { value: 'CRUDE', text: 'Crude', color: "color: #444444"}
    ];

    const [selected, setSelected] = useState(options[0].value);
    const [errors,setErrors] = useState(null);
    const [viewNow,setViewNow] = useState(false);
    const [loading,setLoading] = useState(false);
    const [disable, setDisabled] = useState(true);

    const toast = useToast();

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

    const handleDataListUpdate = useCallback((data) => {
        props.onDateUpdate(data);
    },[props.onDateUpdate])

    const handleCategoryChange = (ev) => {
        setSelected(ev.target.value);
        changeItemCategoryView(ev.target.value);
    }

    const changeItemCategoryView = (item_category_value) => {
        const product = document.querySelector('.product');
        const crudes = document.querySelectorAll('.crude');
        const checker = ["CRUDE", "FINISHED GOODS"];

        setDisabled(true);
        if (item_category_value != "") {
            setDisabled(false);
        }

        if (!checker.includes(item_category_value)) {
            // Materials
            product.style.display = "none";
            crudes.forEach( (crude) => {crude.style.display = "none"})
        } else {
            // Produtcs
            product.style.display = "block";

            if (item_category_value == "CRUDE") {
                crudes.forEach( (crude) => {crude.style.display = "block"})
            } else {
                crudes.forEach( (crude) => {crude.style.display = "none"})
            }
        }
    }

    const clearForm = () => {
        document.getElementById("frmItem").reset();
    }

    const id_ref = useRef();
    const item_category_ref = useRef();
    const item_type_ref = useRef();
    const item_code_ref = useRef();
    const item_desc_ref = useRef();
    const item_ref = useRef();
    const schedule_class_ref = useRef();
    const alloy_ref = useRef();
    const size_ref = useRef();
    const weight_ref = useRef();
    const cut_weight_ref = useRef();
    const cut_length_ref = useRef();
    const cut_width_ref = useRef();
    const std_material_used_ref = useRef();
    const finished_code_ref = useRef();
    const finished_desc_ref = useRef();

    const onSave = (ev) => {
        ev.preventDefault();

        const item_data = {
            id: id_ref.current.value,
            item_category: item_category_ref.current.value,
            item_type: item_type_ref.current.value,
            item_code: item_code_ref.current.value,
            item_desc: item_desc_ref.current.value,
            item: item_ref.current.value,
            schedule_class: schedule_class_ref.current.value,
            alloy: alloy_ref.current.value,
            size: size_ref.current.value,
            weight: weight_ref.current.value,
            cut_weight: cut_weight_ref.current.value,
            cut_length: cut_length_ref.current.value,
            cut_width: cut_width_ref.current.value,
            std_material_used: std_material_used_ref.current.value,
            finished_code: finished_code_ref.current.value,
            finished_desc: finished_desc_ref.current.value,
        }

        setErrors(null);
        setLoading(true)

        if (item_data.id !== null && item_data.id !== "" && item_data.id !== undefined) {
            axiosClient.put('/items/'+item_data.id, item_data)
                .then(({data}) => {
                    clearForm();
                    msgHandler(data);
                    if (data.hasOwnProperty('data')) {
                        handleDataListUpdate(data.data);
                    }
                })
                .catch((err) => {
                    if (err.response != undefined) {
                        const errMessage = err.response.data.message;
                        const error = {
                            message: errMessage,
                            status: 'error'
                        }

                        msgHandler(error);
                    }
                    
                }).then(() => {
                    setLoading(false)
                });
        } else {
            axiosClient.post('/items', item_data)
                .then(({data}) => {
                    clearForm();
                    msgHandler(data);
                    if (data.hasOwnProperty('data')) {
                        handleDataListUpdate(data.data);
                    }
                })
                .catch((err) => {
                    if (err.response != undefined) {
                        const errMessage = err.response.data.message;
                        const error = {
                            message: errMessage,
                            status: 'error'
                        }

                        msgHandler(error);
                    }
                }).then(() => {
                    setLoading(false)
                });
        }
    }

    let id = props.editID;

    const getItemDetails = async () => {
        if (id != null) {
            await axiosClient.get('/items/'+id)
                .then(({data}) => {                    
                    if (data != null && data.hasOwnProperty('id')) {
                        let frmItem = document.getElementById('frmItem');

                        changeItemCategoryView(data.item_category);
                        frmItem.item_category.value = data.item_category;
                        frmItem.item_category.disabled = true;

                        switch (data.item_category) {
                            case "RAW MATERIAL":
                                frmItem.id.value = data.id;
                                frmItem.item_type.value = data.item_type;
                                frmItem.item_code.value = data.item_code;
                                frmItem.item_desc.value = data.item_desc;
                                frmItem.item.value = data.item;
                                frmItem.schedule_class.value = data.schedule_class;
                                frmItem.alloy.value = data.alloy;
                                frmItem.size.value = data.size;
                                frmItem.weight.value = data.weight;
                                break;
                            case "FINISHED GOODS":
                                frmItem.id.value = data.id;
                                frmItem.item_type.value = data.item_type;
                                frmItem.item_code.value = data.item_code;
                                frmItem.item_desc.value = data.item_desc;
                                frmItem.item.value = data.item;
                                frmItem.schedule_class.value = data.schedule_class;
                                frmItem.alloy.value = data.alloy;
                                frmItem.size.value = data.size;
                                frmItem.weight.value = data.weight;
                                frmItem.cut_weight.value = data.cut_weight;
                                frmItem.cut_length.value = data.cut_length;
                                frmItem.cut_width.value = data.cut_width;
                                frmItem.std_material_used.value = data.std_material_used;
                                break;
                            default:
                                frmItem.id.value = data.id;
                                frmItem.item_type.value = data.item_type;
                                frmItem.item_code.value = data.item_code;
                                frmItem.item_desc.value = data.item_desc;
                                frmItem.item.value = data.item;
                                frmItem.schedule_class.value = data.schedule_class;
                                frmItem.alloy.value = data.alloy;
                                frmItem.size.value = data.size;
                                frmItem.weight.value = data.weight;
                                frmItem.cut_weight.value = data.cut_weight;
                                frmItem.cut_length.value = data.cut_length;
                                frmItem.cut_width.value = data.cut_width;
                                frmItem.std_material_used.value = data.std_material_used;
                                frmItem.finished_code.value = data.finished_code;
                                frmItem.finished_desc.value = data.finished_desc;
                                break;
                        }
                        setViewNow(true);
                    }
                })
                .catch((err) => {
                    setViewNow(true);
                    console.log(err);
                }).then(() => {
                    
                });
        } else {
            setViewNow(true);
        }
    }
    
    useEffect( () => {
        changeItemCategoryView(selected);
        getItemDetails();
    },[viewNow]);

    return (
        <Container maxW='8xl'>
            <form className="" onSubmit={onSave} id="frmItem">
                <input type="hidden" id="id" name="id" ref={id_ref}/>
                <Stack direction={['column', 'row']} spacing={3}>
                    <Box w='100%'>
                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="item_category" isRequired mb={2}>
                                <FormLabel>Item Category</FormLabel>
                                <Select placeholder='Select Item Category' name="item_category" value={selected} ref={item_category_ref} size="sm" onChange={handleCategoryChange}>
                                    {
                                        options.map( option => (
                                            <option key={option.value} value={option.value}>{option.text}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="item_type" isRequired mb={2}>
                                <FormLabel>Item Type</FormLabel>
                                <Input name="item_type" ref={item_type_ref} placeholder="Material Type / Product Line" size="sm" disabled={disable} />
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="item_code" isRequired mb={2}>
                                <FormLabel>Item Code</FormLabel>
                                <Input name="item_code" ref={item_code_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="item_desc" isRequired mb={2}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder='Item Description'
                                    size='sm'
                                    resize='none'
                                    name="item_desc" ref={item_desc_ref} disabled={disable}
                                />
                            </FormControl>
                        </Skeleton>
                    </Box>
                    
                    <Box w='100%'>
                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="item" mb={2}>
                                <FormLabel>Item</FormLabel>
                                <Input name="item" ref={item_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="schedule_class" mb={2}>
                                <FormLabel>Schedule / Class</FormLabel>
                                <Input name="schedule_class" ref={schedule_class_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="alloy" mb={2}>
                                <FormLabel>Alloy</FormLabel>
                                <Input name="alloy" ref={alloy_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="size" mb={2}>
                                <FormLabel>Size</FormLabel>
                                <Input name="size" ref={size_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="weight" mb={2}>
                                <FormLabel>Weight</FormLabel>
                                <NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01} disabled={disable}>
                                    <NumberInputField name="weight" ref={weight_ref}/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Skeleton>
                    </Box>

                    <Box w='100%' className="product">
                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="cut_weight" mb={2}>
                                <FormLabel>Cut Weight</FormLabel>
                                <NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01} disabled={disable}>
                                    <NumberInputField name="cut_weight" ref={cut_weight_ref}/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="cut_length" mb={2}>
                                <FormLabel>Cut Length</FormLabel>
                                <NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01} disabled={disable}>
                                    <NumberInputField name="cut_length" ref={cut_length_ref}/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="cut_width" mb={2}>
                                <FormLabel>Cut Width</FormLabel>
                                <NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01}  disabled={disable}>
                                    <NumberInputField name="cut_width" ref={cut_width_ref}/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="std_material_used" mb={2}>
                                <FormLabel>Std. Material Used</FormLabel>
                                <Input name="std_material_used" ref={std_material_used_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>
                    </Box>

                    <Box w='100%' className="crude">
                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="finished_code" mb={2}>
                                <FormLabel>Finished Code</FormLabel>
                                <Input name="finished_code" ref={finished_code_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>

                        <Skeleton isLoaded={viewNow}>
                            <FormControl id="finished_desc" mb={2}>
                                <FormLabel>Finished Description</FormLabel>
                                <Input name="finished_desc" ref={finished_desc_ref} size="sm" disabled={disable}/>
                            </FormControl>
                        </Skeleton>
                    </Box>
                </Stack>
                <Stack direction='row' spacing={4} align='center'>
                    <Skeleton isLoaded={viewNow}>
                        <Button type="submit" colorScheme='teal' variant='outline' leftIcon={<CheckIcon />} isLoading={loading} spinnerPlacement='end'>
                            Save
                        </Button>
                    </Skeleton>

                    <Skeleton isLoaded={viewNow}>
                        <Button colorScheme='red' variant='outline' leftIcon={<RepeatIcon />} isLoading={loading} spinnerPlacement='end' onClick={clearForm}>
                            Reset
                        </Button>
                    </Skeleton>
                </Stack>
            </form>
        </Container>
    );
}