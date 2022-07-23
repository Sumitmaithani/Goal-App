import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [goal, setGoal] = useState("");
  const [goalsList, setGoalsList] = useState([]);
  const [modelVisible, setModalVisible] = useState(false);

  function handleChange(event) {
    setGoal(event);
  }
  function handleSubmit() {
    setGoalsList((currentGoal) => [
      ...currentGoal,
      { text: goal, id: Math.random().toString() },
    ]);
    setGoal("");
    handleVisible();
  }
  function handleDelete(id) {
    setGoalsList((currentGoal) => {
      return currentGoal.filter((goal) => goal.id !== id);
    });
  }

function handleVisible(){
  setModalVisible(!modelVisible);
}

  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title='Add a Goal' onPress={handleVisible} color='green' />
      <GoalInput
        value={goal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        visible={modelVisible}
        handleVisible={handleVisible}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={goalsList}
          renderItem={(i) => {
            return (
              <GoalItem
                text={i.item.text}
                handleDelete={handleDelete}
                id={i.item.id}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5,
  },
});
