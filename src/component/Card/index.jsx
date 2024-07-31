import { Card, CardBody, CardFooter, CardHeader} from "@chakra-ui/react"

function CardComponent({ header, footer, children, ...props }) {
    return (
        <Card {...props}>
            {header}
            <CardBody p={0}>
                {children}
            </CardBody>
            {footer}
        </Card>
    )
}

export default CardComponent