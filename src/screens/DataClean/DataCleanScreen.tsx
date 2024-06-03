import React, { useCallback, useEffect, useState } from "react";
import { View, KeyboardAvoidingView, ScrollView, Text, GestureResponderEvent } from "react-native";
import { Alert, Button, Divider, Flex, FormControl, HStack, Radio, Stack, VStack, useToast, Text as Text1 } from "native-base";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "./styles";
import { useFormik } from "formik";

const DatacleanScreen: React.FC = () => {


  const toast = useToast();
  
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {

    console.log(formik.values.data_clean);

    const errorsList = validate(formik.values);
    const hasErrors = JSON.stringify(errorsList) !== "{}";

    if (hasErrors) {
      setErrors(true);
      formik.setErrors(errorsList);

      toast.show({
        placement: "top",
        render: () => {
          return <ErrorHandler />;
        },
      });
      
    } else {
      setErrors(false);
      toast.show({
        placement: "top",
        render: () => {
          return <InfoHandler />;
        },
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      data_clean: "",
    },
    onSubmit: (values) => console.log(values),
    validate: (values) => validate(values),
    validateOnBlur: false,
    validateOnChange: false,
  });

  const validate = useCallback((values: any) => {
    const errors: any = {};

    if (!values.data_clean) {
      errors.data_clean = "Obrigatório";
    }
    return errors;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.background}>
      {loading ? ( 
        <Spinner
          visible={true}
          textContent={"Limpando dados nao usados no ultimos 6 meses..."}
          textStyle={styles.spinnerTextStyle}
        />
      ) : undefined}
      <ScrollView>
        <View>
          <View style={styles.containerForm}>
            <Text style={styles.txtLabel}>
              Limpeza de Dados{"                                                        "}
            </Text>
            <Divider />
            <Flex
              direction="column"
              mb="2.5"
              mt="1.5"
              _text={{ color: "coolGray.800" }}
            >
              <Text>
                {" "}
                {/* <Text style={styles.txtLabel}>
                  Seleccione a opçao
                </Text> */}
              </Text>


              <FormControl
                  key="data_clean"
                  isRequired
                  isInvalid={"data_clean" in formik.errors}
                >
                  <FormControl.Label>Seleccione a opçao</FormControl.Label>
                  <Radio.Group
                    value={formik.values.data_clean + ""}
                    onChange={(itemValue) => {
                      formik.setFieldValue("data_clean", itemValue);
                    }}
                    name="rg4"
                    accessibilityLabel="pick a size"
                  >
                    <Stack
                      alignItems={{
                        base: "flex-start",
                        md: "center",
                      }}
                      space={1}
                      w="75%"
                      maxW="300px"
                    >
                      <Radio
                        key="defi1"
                        value="0"
                        colorScheme="green"
                        size="md"
                        my={1}
                      >
                        Limpeza Regular
                      </Radio>                      
                      <Radio
                        key="defi2"
                        value="1"
                        colorScheme="green"
                        size="md"
                        my={1}
                      >
                        Limpeza do Fim do COP
                      </Radio>
                    </Stack>
                  </Radio.Group>
                  <FormControl.ErrorMessage>
                    {formik.errors.data_clean}
                  </FormControl.ErrorMessage>
                </FormControl>

                <Button
                  isLoading={loading}
                  isLoadingText="Cadastrando"
                  onPress={handleSubmit}
                  my="10"
                  colorScheme="primary"
                >
                  Salvar
                </Button>

              <Text>
                {" "}
                <Text style={styles.txtLabel}>
                 {" "}
                </Text>{" "}
                
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}>
                 {" "}
                </Text>{" "}
                
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>

              <Text>
                {" "}
                <Text style={styles.txtLabel}> </Text>{" "}
              </Text>
            </Flex>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const InfoHandler: React.FC = () => {
  return (
    <>
      <Alert w="100%" variant="left-accent" colorScheme="success" status="success">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text1 color="coolGray.800">Limpeza de dados terminada com sucesso!</Text1>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </>
  );
};


const ErrorHandler: React.FC = () => {
  return (
    <>
      <Alert w="100%" variant="left-accent" colorScheme="success" status="error">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text1 color="coolGray.800">Nenhuma opçao Selecionada!</Text1>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </>
  );
};

export default DatacleanScreen;
