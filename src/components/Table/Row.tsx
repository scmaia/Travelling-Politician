interface IRowProps {
  columns: (string|number)[];
  onClick: () => void;
  isSelected: boolean;
}

const Row: React.FC<IRowProps> = ({ columns, onClick, isSelected }) => {
  return (
    <tr
      onClick={onClick}
      className={isSelected ? "table--selected" : undefined}
    >
      {columns.map((column, index) => (
        <td key={`row${columns[0]}${index}`}>{column}</td>
      ))}
    </tr>
  );
};

export default Row;
