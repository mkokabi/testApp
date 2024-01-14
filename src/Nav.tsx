import {
  MenuItem,
  MenuItemLink,
  MenuList,
  makeStyles,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

const useMenuListContainerStyles = makeStyles({
  container: {
    minWidth: "128px",
    minHeight: "48px",
    maxWidth: "180px",
    width: "max-content",
    paddingTop: "4px",
    paddingBottom: "4px",
  },
});

export const Nav = () => {
  const navigate = useNavigate();
  const styles = useMenuListContainerStyles();

  return (
    <div className={styles.container}>
      <MenuList>
        {/* <MenuItemLink href="/profile">Profile</MenuItemLink> */}
        <MenuItem onClick={() => navigate("/workorders")}>WorkOrders</MenuItem>
      </MenuList>
    </div>
  );
};
