import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosClient from "../../axios-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaSave, FaTimes } from 'react-icons/fa';
import {
    Box,
    Flex,
	Stack,
    HStack,
    Button,
    useColorModeValue,
    Text,
	Container,
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
    useDisclosure,
	Skeleton,
	FormControl,
	FormLabel,
	Textarea,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper
} from "@chakra-ui/react";

export default function InventoryForm() {

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
                        flex={{ base: 6, lg: 1 }}
                        direction={"row"}
                        spacing={2}
                        justify={"flex-start"}
                    >
                        <Text
                            fontFamily={"heading"}
                            fontWeight={500}
                            minW={"130px"}
                        >
                            New Inventory Item
                        </Text>

                        
                        
                    </HStack>
					<HStack
						flex={{ base: 6, lg: 2 }}
                        direction={"row"}
                        spacing={2}
                        justify={"flex-end"}
					>
						<Button
                            variant={"outline"}
                            colorScheme={"blue"}
                            borderRadius={"0px"}
                            aria-label="Save"
                            size="sm"
                            title="Click this buton to save Inventory Item details"
                            isLoading={loading} 
                            spinnerPlacement='end'
							leftIcon={<FaSave/>}
                        >Save</Button>
						<Button
                            variant={"outline"}
                            colorScheme={"red"}
                            borderRadius={"0px"}
                            aria-label="Cancel"
                            size="sm"
                            title="Click this buton to cancel transaction"
                            isLoading={loading} 
                            spinnerPlacement='end'
							leftIcon={<FaTimes/>}
                        >Cancel</Button>
					</HStack>
                </Flex>
            </Box>
			<Container maxW='8xl' mt={5}>
				<form className="" id="frmInventory">
					<input type="hidden" id="id" name="id"/>
					<Stack direction={['column', 'row']} spacing={3}>
						<Box w='100%'>
							<Skeleton isLoaded={true}>
								<FormControl id="item_category" isRequired mb={2}>
									<FormLabel>Item Category</FormLabel>
									<Select placeholder='Select Item Category' name="item_category" size="sm">
										
									</Select>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="item_type" isRequired mb={2}>
									<FormLabel>Item Type</FormLabel>
									<Input name="item_type" placeholder="Material Type / Product Line" size="sm" disabled={true} />
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="item_code" isRequired mb={2}>
									<FormLabel>Item Code</FormLabel>
									<Input name="item_code" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="item_desc" isRequired mb={2}>
									<FormLabel>Description</FormLabel>
									<Textarea
										placeholder='Item Description'
										size='sm'
										resize='none'
										name="item_desc" disabled={true}
									/>
								</FormControl>
							</Skeleton>
						</Box>
						
						<Box w='100%'>
							<Skeleton isLoaded={true}>
								<FormControl id="item" mb={2}>
									<FormLabel>Item</FormLabel>
									<Input name="item" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="schedule_class" mb={2}>
									<FormLabel>Schedule / Class</FormLabel>
									<Input name="schedule_class" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="alloy" mb={2}>
									<FormLabel>Alloy</FormLabel>
									<Input name="alloy" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="size" mb={2}>
									<FormLabel>Size</FormLabel>
									<Input name="size" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="weight" mb={2}>
									<FormLabel>Weight</FormLabel>
									<NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01} disabled={true}>
										<NumberInputField name="weight" />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Skeleton>
						</Box>

						<Box w='100%' className="product">
							<Skeleton isLoaded={true}>
								<FormControl id="cut_weight" mb={2}>
									<FormLabel>Cut Weight</FormLabel>
									<NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01} disabled={true}>
										<NumberInputField name="cut_weight"/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="cut_length" mb={2}>
									<FormLabel>Cut Length</FormLabel>
									<NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01} disabled={true}>
										<NumberInputField name="cut_length"/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="cut_width" mb={2}>
									<FormLabel>Cut Width</FormLabel>
									<NumberInput size="sm" defaultValue={0} precision={2} step={0.01} min={0.01}  disabled={true}>
										<NumberInputField name="cut_width"/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="std_material_used" mb={2}>
									<FormLabel>Std. Material Used</FormLabel>
									<Input name="std_material_used" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>
						</Box>

						<Box w='100%' className="crude">
							<Skeleton isLoaded={true}>
								<FormControl id="finished_code" mb={2}>
									<FormLabel>Finished Code</FormLabel>
									<Input name="finished_code" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>

							<Skeleton isLoaded={true}>
								<FormControl id="finished_desc" mb={2}>
									<FormLabel>Finished Description</FormLabel>
									<Input name="finished_desc" size="sm" disabled={true}/>
								</FormControl>
							</Skeleton>
						</Box>
					</Stack>
				</form>
			</Container>
		</div>
	);
}
