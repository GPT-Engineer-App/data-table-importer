import { useState } from "react";
import { Container, Text, VStack, Button, Input, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        parseCSV(text);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text) => {
    const rows = text.split("\n");
    const data = rows.map((row) => row.split(","));
    setCsvData(data);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">CSV Importer</Text>
        <Input type="file" accept=".csv" onChange={handleFileUpload} display="none" id="file-upload" />
        <Button as="label" htmlFor="file-upload" leftIcon={<FaUpload />} colorScheme="teal">
          Upload CSV
        </Button>
        {fileName && <Text>File: {fileName}</Text>}
        {csvData.length > 0 && (
          <Table variant="simple">
            <Thead>
              <Tr>
                {csvData[0].map((header, index) => (
                  <Th key={index}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <Td key={cellIndex}>{cell}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
};

export default Index;