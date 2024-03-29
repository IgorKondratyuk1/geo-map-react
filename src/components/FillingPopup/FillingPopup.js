import {Form, Modal} from "antd";
import {useSelector} from "react-redux";
import {getFormFields} from "../../helpers/getFormFields";

const FillingPopup = ({ visible, setVisible, onCreate }) => {
    const [form] = Form.useForm();
    const markerType = useSelector((state) => state.tempMarker.markerType);

    const handleCancel = () => {
        setVisible();
    };

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            open={visible}
            title="Внесіть дані"
            okText="Ok"
            onCancel={handleCancel}
            onOk={handleCreate}
        >
            <Form form={form} layout="vertical">
                {getFormFields(markerType)}
            </Form>
        </Modal>
    );
};

export default FillingPopup;