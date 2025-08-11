import CalendarInput from '@/src/shared/calendarInput/CalendarInput';
import SelectFromForm from '@/src/shared/selectFromForm/SelectFromForm';
import SimpleInput from '@/src/shared/simpleInput/SimpleInput';
import { IForms } from '@/src/shared/types/types';

interface Props {
  item: IForms;
}

const UniInput: React.FC<Props> = ({ item }) => {
  return item.type === 'selector' ? (
    <SelectFromForm key={item.name} item={item} />
  ) : item.type === 'calendar' ? (
    <CalendarInput key={item.name} item={item} />
  ) : item.type === 'input' ? (
    <SimpleInput key={item.name} item={item} />
  ) : null;
};
export default UniInput;
