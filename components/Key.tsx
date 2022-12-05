import { KeyTypeEnum } from '../models/keyType'

interface Props {
  text: string;
  keyType: KeyTypeEnum;
  keyClick: () => void;
}

export const Key: React.FC<Props> = ({ text, keyType, keyClick }) => {
  const classes = (keyType: KeyTypeEnum): string => {
    let classes: string = 'p-4 pb-3 border-b-4 text-lg text-white rounded-xl font-bold text-center cursor-pointer';

    if (keyType === KeyTypeEnum.DEFAULT) {
      classes = `${classes} bg-gray-100 border-gray-300 text-gray-800`;
    }

    if (keyType === KeyTypeEnum.PRIMARY) {
        classes = `${classes} bg-blue-400 border-blue-500 text-white`;
    }

    if (keyType === KeyTypeEnum.SECONDARY) {
        classes = `${classes} bg-red-500 border-red-600 text-white`;
    }

    return classes;
}
  return (
    <div className={classes(keyType)} onClick={keyClick}>
      <p>{text}</p>
    </div>
  )
}
