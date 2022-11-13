import { useState } from 'react';

interface IAlert {
  isVisible: boolean;
  message: string;
}

const Alert: React.FC<IAlert> = ({ isVisible = false, message }: IAlert) =>
  isVisible ? (
    <div>
      <p style={{ backgroundColor: 'red', color: 'white' }}>{message}</p>
    </div>
  ) : null;

export default Alert;
