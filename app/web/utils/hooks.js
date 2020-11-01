import React, {useState} from 'react';

export const useModal = (modalName = 'gxt-modal', initialValue = false) => {
  let modals = {};
  const [visible, setVisible] = useState(initialValue);
  
  const open = React.useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const close = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  return {
    visible,
    open,
    close
  }
};