import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import {
    Stat,
	StatLabel,
	StatNumber,
    Container,
    Box,
    Stack,
    Skeleton,
    Card,
	CardBody,
    useToast,
} from "@chakra-ui/react";
import { CheckIcon, RepeatIcon } from "@chakra-ui/icons";

export default function Dashboard() {
    const [itemSkeleton, setItemSkeleton] = useState(false);
	const [rawMaterials, setRawMaterials] = useState(0);
	const [crudes, setCrudes] = useState(0);
	const [finishedGoods, setFinishedGoods] = useState(0);

    const getItemsCount = async () => {
        await axiosClient
            .get("/items-status")
            .then(({ data }) => {
				console.log(data);
				console.log(data.raw_materials);
				console.log(data.crude);
				console.log(data.finished_goods);
				setRawMaterials(data.raw_materials);
				setCrudes(data.crude);
				setFinishedGoods(data.finished_goods);
                setItemSkeleton(true);
            })
            .catch((err) => {
                setItemSkeleton(true);
                console.log(err);
            })
            .then(() => {});
    };

	useEffect(() => {
		getItemsCount();
	},[]);

    return (
		<Container maxW='12xl'>
			<Stack direction={['column', 'row']} spacing={3} pt={5}>
				<Box w='100%'>
					<Skeleton isLoaded={itemSkeleton}>
						<Card>
							<CardBody>
								<Stat>
									<StatLabel>Raw Materials</StatLabel>
									<StatNumber>{rawMaterials}</StatNumber>
								</Stat>
							</CardBody>
						</Card>
					</Skeleton>
				</Box>
				<Box w='100%'>
					<Skeleton isLoaded={itemSkeleton}>
						<Card>
							<CardBody>
								<Stat>
									<StatLabel>Finished Goods</StatLabel>
									<StatNumber>{finishedGoods}</StatNumber>
								</Stat>
							</CardBody>
						</Card>
					</Skeleton>
				</Box>
				<Box w='100%'>
					<Skeleton isLoaded={itemSkeleton}>
						<Card>
							<CardBody>
								<Stat>
									<StatLabel>Crude Items</StatLabel>
									<StatNumber>{crudes}</StatNumber>
								</Stat>
							</CardBody>
						</Card>
					</Skeleton>
				</Box>
				<Box w='100%'></Box>
				<Box w='100%'></Box>
				<Box w='100%'></Box>
			</Stack>
		</Container>
	);
}
