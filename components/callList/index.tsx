import React, { useState } from "react";
import { Logo, LogoContainer } from "../signIn/styled.components";
import { Modal, Spin } from "antd";
import {
  FilterContainer,
  GlobalStyle,
  HeaderContainer,
  Heading,
  MainContainer,
  TableContainer,
  Title,
  CustomButton,
  NotesButton,
  LogOutButton,
  DirectionText,
  Text,
  ModalContainer,
  SpinContainer,
} from "./styled.components";
import turingTechLogo from "../../assets/images/logo.png";
import { Table, Button } from "antd";
import { Select } from "antd";
import moment from "moment";
import AddNotesModal from "./addNotesModal";
import { useRecoilValue } from "recoil";
import { noteText } from "./atoms";
import { POST_NOTES } from "./mutations";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import { initializeApollo } from "../../lib/apollo-client";

const CallList = (props) => {
  const client = initializeApollo();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataObject, setDataObject] = useState<any>({});
  const [status, setStatus] = useState<String>("All");
  const note_Text = useRecoilValue<String>(noteText);
  let router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    Cookies.remove("access_token");
    router.push("/");
  };

  const handleChange = ({ value }: any) => {
    setStatus(value);
  };

  const handleOk = async () => {
    const accessToken = await Cookies.get("access_token");
    setIsModalOpen(false);
    await client.mutate({
      mutation: POST_NOTES,
      variables: {
        input: {
          activityId: dataObject.id,
          content: note_Text,
        },
        context: {
          accessToken,
        },
      },
    });
  };

  const columns = [
    {
      title: "Call type",
      dataIndex: "call_type",
      key: "call_type",
      render: (text: string) => {
        return (
          <DirectionText value={text}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </DirectionText>
        );
      },
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
      render: (text: string) => {
        return (
          <DirectionText value={text}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </DirectionText>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_key: any) => {
        let f = moment.utc(_key).format("mm ss");
        const time2 = f.split(" ");
        const totalSeconds: number = moment(_key).seconds();
        const final: any = time2.map(
          (val, index) => `${val} ${["minutes", "seconds"][index]}`
        );
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {final}
            <span
              style={{ color: "#325AE7" }}
            >{`(${totalSeconds} seconds)`}</span>
          </div>
        );
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text: string) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (text: string) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "Via",
      dataIndex: "via",
      key: "via",
      render: (text: string) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (data: any) => {
        return moment(data).format("MM-DD-YYYY");
      },
    },
    {
      title: "Status",
      dataIndex: "is_archived",
      key: "is_archived",
      render: (data: any) => {
        if (data === true) {
          return <CustomButton value={"true"}>Archived</CustomButton>;
        } else {
          return <CustomButton value={"false"}>Unarchive</CustomButton>;
        }
      },
    },
    {
      title: "Notes",
      dataIndex: "",
      key: "",

      render: (_data: any, data: any, index: any) => {
        return data[0] ? (
          <p>{data[0]}</p>
        ) : (
          <NotesButton
            onClick={() => {
              showModal();
              setDataObject(_data);
            }}
          >
            Add Note
          </NotesButton>
        );
      },
    },
  ];
  const filterArchieveData = props?.callsData?.paginatedCalls?.nodes.filter(
    (d: any) => {
      if (d.is_archived) {
        return d;
      }
    }
  );

  const filterUnArchiveData = props?.callsData?.paginatedCalls?.nodes.filter(
    (d: any) => {
      if (!d.is_archived) {
        return d;
      }
    }
  );
  {
  }
  return (
    <MainContainer>
      <HeaderContainer>
        <LogoContainer>
          <Image src={turingTechLogo} alt="logo" width={250} height={30} />
        </LogoContainer>
        <LogOutButton onClick={handleClick}>Logout</LogOutButton>
      </HeaderContainer>
      <Heading>Turing Technologies Frontend Test</Heading>
      <div>
        <GlobalStyle />
        <FilterContainer>
          <Title>Filter By</Title>

          <Select
            labelInValue
            defaultValue={{ value: "Status", label: "Status" }}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "All",
                label: "All",
              },
              {
                value: "Archived",
                label: "Archived",
              },
              {
                value: "Unarchived",
                label: "Unarchived",
              },
            ]}
          />
        </FilterContainer>
      </div>
      <TableContainer>
        {props?.callsData ? (
          <Table
            dataSource={
              status === "All"
                ? props?.callsData?.paginatedCalls?.nodes
                : status === "Archived"
                ? filterArchieveData
                : filterUnArchiveData
            }
            columns={columns}
          />
        ) : (
          <SpinContainer>
            <Spin />
          </SpinContainer>
        )}
      </TableContainer>
      <ModalContainer>
        <GlobalStyle />
        <Modal
          title="Add Notes"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
          okText="Save"
        >
          <AddNotesModal props={dataObject} />
        </Modal>
      </ModalContainer>
    </MainContainer>
  );
};

export default CallList;
