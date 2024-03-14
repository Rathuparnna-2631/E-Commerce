import { Alert } from "react-bootstrap"

const Alerts = ({ variant, children }) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}
Alerts.defaultProps = {
    variant: 'info',
};
export default Alerts