import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { DBContext } from "@/context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import Realm from "realm";

SplashScreen.preventAutoHideAsync();

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState<any>(null);

  useEffect(() => {
    async function prepare() {
      const connection = await Realm.open({
        path: "nomadDiaryDB",
        schema: [FeelingSchema],
      });
      setRealm(connection);
      setReady(true);
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <DBContext.Provider value={realm}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="write"
          options={{
            title: "Write",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "code-slash" : "code-slash-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </DBContext.Provider>
  );
}
