import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Text, FlatList, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { COLORS } from "./Colors";

const Expense = () => {

  const [visible, setVisible] = useState(false);
  const [textAmout, onChangeTextA] = React.useState('');
  const [textSpend, onChangeTextS] = React.useState('');
  const [textNote, onChangeTextN] = React.useState('');

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dateSelectetor}>
        <View style={styles.dateSelectetorBack}>
          <Icon name='chevron-back-outline' size={30} color={COLORS.white} />
        </View>
        <View style={styles.dateSelectetorDate}>
          <Text style={styles.dateSelectetorDateText}> January 2024</Text>
        </View>
        <View style={styles.dateSelectetorNext}>
          <Icon name='chevron-forward-outline' size={30} color={COLORS.white} />
        </View>
      </View>
      <View style={styles.expenseHeaderMain}>
        <View style={styles.expenseHeader}>
          <View style={styles.expenseHeaderBox}>
            <Text style={styles.expenseIncome}> Income +</Text>
            <Text style={styles.expenseIncomeTotal}> &#8377; 10000</Text>
          </View>
          <View style={styles.expenseHeaderExpense}></View>
          <View style={styles.expenseHeaderBox}>
            <Text style={styles.expenseIncome}> Expense -</Text>
            <Text style={styles.expenseTotal}> &#8377; 5000</Text>
          </View>
          <View style={styles.expenseHeaderBalance}></View>
          <View style={styles.expenseHeaderBox}>
            <Text style={styles.expenseIncome}> Balance</Text>
            <Text style={styles.expenseBalance}> &#8377; 5000</Text>
          </View>
        </View>
        <View style={styles.expenseHeaderBottom}>
        </View>
      </View>
      <View style={styles.expenseList}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <ExpenseItem date={item.date} dayTotal={item.dayTotal} dailyExpenseList={item.dailyExpenseList} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={renderSeparator}

        />
      </View>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={showDialog}
      >
        <Icon name='add' size={30} color={COLORS.white} />
      </TouchableOpacity>
      <Dialog.Container visible={visible} contentStyle={{ paddingTop: 1 }}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.dialogExpense}>
              <Text style={styles.dialogExpenseText}>Expense</Text>
            </View>
            <View style={styles.dialogIncome}>
              <Text style={styles.dialogIncomeText}>Income</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTextA}
            value={textAmout}
            placeholder="Amount"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeTextS}
            value={textSpend}
            placeholder="Spend for"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeTextN}
            value={textNote}
            placeholder="Add note"
          />
          <View style={styles.dialogDate}>
            <Icon name='calendar' size={30} color={COLORS.inputBottom} />
            <Text style={styles.dialogDateText}>14 Jan 2024</Text>
          </View>
        </View>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Ok" onPress={handleOk} />
      </Dialog.Container>
    </SafeAreaView>
  );
};

const ExpenseBody = ({ title, total, description }) => (
  <View style={styles.expenseBody1}>
    <View style={styles.expenseBody2}>
      <Text style={styles.expenseBody2Text}>H</Text>
    </View>
    <View style={styles.expenseBody3}>
      <View style={styles.expenseBody3Row}>
        <Text style={styles.expenseBody3RowTitle}>{title}</Text>
        <Text style={styles.expenseBody3RowAmount}>&#8377; {total}</Text>
      </View>
      <View style={styles.expenseBody4}>
        <Text style={styles.expenseBody4Description}>{description}</Text>
      </View>
    </View>
  </View>
);

const ExpenseItem = ({ date, dayTotal, dailyExpenseList }) => (
  <View style={styles.expenseBodyRow}>
    <View style={styles.expenseBodyRowItemHeader}>
      <Text style={styles.expenseBodyRowItemHeaderDate}>{date}</Text>
      <Text style={styles.expenseBodyRowItemHeaderTotal}>&#8377; {dayTotal}</Text>
    </View>
    <View style={styles.expenseBodyRowItemHeaderDevider}></View>
    <View style={styles.expenseBodyRowItemBody}>
      <FlatList
        data={dailyExpenseList}
        renderItem={({ item }) => <ExpenseBody title={item.title} total={item.total} description={item.description} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparatorBody}
      />
    </View>
  </View>
);

const renderSeparator = () => (
  <View
    style={styles.renderSeparator}
  />
);
const renderSeparatorBody = () => (
  <View
    style={styles.renderSeparatorBody}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  expenseList: {
    backgroundColor: COLORS.grey,
    height: '84%',
    marginTop: 5
  },
  expenseHeaderMain: {
    flexDirection: "column"
  },
  expenseHeader: {
    flexDirection: "row",
    alignContent: 'space-between',
    flexWrap: 'wrap'
  },
  expenseHeaderBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  expenseHeaderBottom: {
    height: 1,
    backgroundColor: COLORS.headerDivider
  },
  expenseBodyRow: {
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  expenseBodyRowItemHeader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 10,
    flexWrap: 'wrap'
  },
  expenseBodyRowItemHeaderDevider: {
    height: 1,
    backgroundColor: COLORS.grey
  },
  expenseBodyRowItemHeaderDate: {
    fontSize: 15,
    color: COLORS.date,
    flex: 1,
    marginLeft: 13,
    fontStyle: 'normal',
    fontWeight: 'bold',
    height: 30
  },
  expenseBodyRowItemHeaderTotal: {
    fontSize: 15,
    color: COLORS.date,
    textAlign: 'right',
    flex: 1,
    marginRight: 12
  },
  expenseBodyRowItemBody: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 15
  },
  expenseBody1: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginHorizontal: 5,
    paddingEnd: 10,
    paddingStart: 10,
    alignSelf: 'baseline',

  },
  expenseBody2: {
    height: 46,
    backgroundColor: COLORS.darkGrey,
    borderRadius: 100,
    borderColor: COLORS.white,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  expenseBody2Text: {
    color: COLORS.white,
    fontSize: 18
  },
  expenseBody3: {
    flex: 1,
    flexDirection: 'column'
  },
  expenseBody3Row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 45,
    paddingBottom: 5
  },
  expenseBody3RowTitle: {
    color: COLORS.black,
    fontSize: 15,
    flex: 2,
    paddingLeft: 15
  },
  expenseBody3RowAmount: {
    color: COLORS.black,
    fontSize: 15,
    flex: 1,
    color: COLORS.amount,
    textAlign: 'right'
  },
  expenseBody4: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft: 15
  },
  expenseBody4Description: {
    color: COLORS.description,
    fontSize: 13,
    fontWeight: 'normal'
  },
  input: {
    marginTop: 5,
    height: 40,
    borderBottomColor: COLORS.inputBottom,
    borderBottomWidth: 1,
  },
  dialogDate: {
    flexDirection: 'row',
    height: 40,
    marginTop: 15
  },
  dialogDateText: {
    flex: 1,
    height: 40,
    marginStart: 5,
    textAlignVertical: 'center',
    paddingBottom: 7,
    fontSize: 17
  },
  dialogExpense: {
    flex: 1,
    marginRight: 5,
    height: 35,
    justifyContent: 'center',
    borderColor: COLORS.primaryColor,
    borderWidth: 1
  },
  dialogExpenseText: {
    textAlign: 'center',
    color: COLORS.primaryColor
  },
  dialogIncome: {
    flex: 1,
    height: 35,
    justifyContent: 'center',
    borderColor: COLORS.inputBottom,
    borderWidth: 1
  },
  dialogIncomeText: {
    textAlign: 'center',
    color: COLORS.inputBottom
  },
  dateSelectetor: {
    height: 45,
    backgroundColor: COLORS.primaryColor,
    flexDirection: 'row'
  },
  dateSelectetorBack: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: 'center'
  },
  dateSelectetorDate: {
    flex: 1.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateSelectetorDateText: {
    fontSize: 18,
    color:COLORS.white
  },
  dateSelectetorNext: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: 'center'
  },
  expenseIncome: {
    color: COLORS.description,
    fontWeight: 'normal',
    fontSize: 13
  },
  expenseIncomeTotal: {
    color: COLORS.incomeTotal,
    fontWeight: 'bold',
    fontSize: 16
  },
  expenseTotal: {
    color: COLORS.expenseTotal,
    fontWeight: 'bold',
    fontSize: 16
  },
  expenseBalance: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16
  },
  renderSeparator: {
    backgroundColor: COLORS.saperator,
    height: 5,
    marginHorizontal: 5
  },
  renderSeparatorBody: {
    backgroundColor: COLORS.white,
    height: 20,
    marginHorizontal: 10
  },
  expenseHeaderExpense: {
    width: 1,
    backgroundColor: COLORS.headerDivider
  },
  expenseHeaderBalance: {
    width: 1,
    backgroundColor: COLORS.headerDivider
  },
  floatButton:{
    borderWidth: 1,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 100,
  }
})

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
    date: '11 Jan 2024',
    dayTotal: '500',
    dailyExpenseList: [
      {
        id: 1,
        title: 'Vegitables',
        total: 300,
        description: "With this file you will create the new form of TextView. In this case, I created a circle of green."
      },
      {
        id: 2,
        title: 'Kirana',
        total: 200,
        description: "With this file you will create the new form of TextView."
      }
    ]
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
    date: '11 Jan 2024',
    dayTotal: '400',
    title: 'Second Item',
    dailyExpenseList: [
      {
        id: 1,
        title: 'Recharge',
        total: 100,
        description: "With this file you will create the new form of TextView."
      },
      {
        id: 2,
        title: 'Screenguard of mobile',
        total: 300,
        description: "With this file you will create the new form of TextView. In this case, I created a circle of green."
      }
    ]
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
    date: '11 Jan 2024',
    dayTotal: '350',
    expense: '1000',
    title: 'Third Item',
    dailyExpenseList: [
      {
        id: 1,
        title: 'Mobile cover',
        total: 400,
        description: "With this file you will create the new form of TextView. In this case, I created a circle of green."
      },
      {
        id: 2,
        title: 'Petrol',
        total: 600,
        description: "With this file you will create the new form of TextView."
      }
    ]
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bf',
    date: '11 Jan 2024',
    dayTotal: '600',
    expense: '500',
    title: 'Fourth Item',
    dailyExpenseList: [
      {
        id: 1,
        title: 'Party',
        total: 200,
        description: "With this file you will create the new form of TextView."
      },
      {
        id: 2,
        title: 'Snacks',
        total: 100,
        description: "With this file you will create the new form of TextView."
      }
    ]
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bg',
    date: '11 Jan 2024',
    dayTotal: '900',
    expense: '200',
    title: 'Fifth Item',
    dailyExpenseList: [
      {
        id: 1,
        title: 'My Shopping',
        total: 100,
        description: "With this file you will create the new form of TextView."
      },
      {
        id: 2,
        title: 'Bills',
        total: 100,
        description: ""
      }
    ]
  }
];

export default Expense; 
