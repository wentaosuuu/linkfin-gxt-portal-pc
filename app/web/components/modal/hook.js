import React, { useState, useEffect } from 'react';

export const useModal = (initialValue = false) => {

  const [visible, setVisible] = useState(initialValue);
  
  const open = () => {
    setVisible(true);
  }

  const close = () => {
    setVisible(false);
  }

  return [
    visible,
    open,
    close
  ]
}