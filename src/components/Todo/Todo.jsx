import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ elemment, count, deleteId }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO {count}
      </Text>
      <Text>{elemment.text}</Text>
      <DeleteButton type="button">
        <RiDeleteBinLine size={24} onClick={()=>deleteId(elemment.id)} />
      </DeleteButton>
    </TodoWrapper>
  );
};
