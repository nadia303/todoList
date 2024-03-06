import React from 'react'
import { Modal, Typography } from 'antd'

const { Text } = Typography

interface DeleteConfirmationModalProps {
  isVisible: boolean
  modalInformation: string
  onCancel: () => void
  onConfirm: () => void
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  modalInformation,
}) => {
  return (
    <Modal
      title="Confirm Delete"
      open={isVisible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <Text>{modalInformation}</Text>
    </Modal>
  )
}