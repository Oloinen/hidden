import { TABLE_HEADERS } from "../constants/CommonConstants";
import './TableHeader.scss'

const TableHeader = (): JSX.Element => (
        <tr>
            {TABLE_HEADERS.map((header: string, index: number) => (
                <th className='header' key={header+index} data-cy={'header-cell'}>
                    <h3 data-cy={'header-text'+index}>{header}</h3>
                </th>
            ))}
        </tr>
)

export default TableHeader;