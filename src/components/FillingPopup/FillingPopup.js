import {Form, Input, Modal} from "antd";

const FillingPopup = (props) => {
    const { visible, setVisible, onCreate } = props;
    const [form] = Form.useForm();

    const handleCancel = () => {
        setVisible(false);
    };

    const handleCreate = () => {
        form
            .validateFields()
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
            title="Create a new collection"
            okText="Ok"
            onCancel={handleCancel}
            onOk={handleCreate}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Оцінка грунку"
                    name="soilMark"
                    rules={[
                        { required: true, message: "Please input the value!" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Оцінка повітря"
                    name="airMark"
                    rules={[
                        { required: true, message: "Please input the value!" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Оцінка води"
                    name="waterMark"
                    rules={[
                        { required: true, message: "Please input the value!" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Рівень радіації"
                    name="radiationLevel"
                    rules={[
                        { required: true, message: "Please input the value!" }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FillingPopup;