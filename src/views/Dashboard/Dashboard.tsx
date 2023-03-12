import {
  CalendarDays,
  ListChecks,
  Settings as SettingIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@src/components/Container";
import { Welcome } from "@src/components/Welcome";
import { useState } from "react";
import { AdminTools } from "./AdminTools";
import { Settings } from "./Settings";
import { Timekeeping } from "./Timekeeping";

enum Tab {
  Timekeeping = "timekeeping",
  AdminTools = "admin-tools",
  Settings = "settings",
}

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>(Tab.Timekeeping);

  return (
    <Container>
      <Welcome />

      <Tabs
        className="w-full mt-3"
        value={tab}
        onValueChange={(t) => setTab(t as Tab)}
      >
        <TabsList aria-label="Manage your account">
          <TabsTrigger value={Tab.Timekeeping}>
            <CalendarDays size={22} />
          </TabsTrigger>
          <TabsTrigger value={Tab.AdminTools}>
            <ListChecks size={22} />
          </TabsTrigger>
          <TabsTrigger value={Tab.Settings}>
            <SettingIcon size={22} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value={Tab.Timekeeping}>
          <Timekeeping />
        </TabsContent>
        <TabsContent value={Tab.AdminTools}>
          <AdminTools />
        </TabsContent>
        <TabsContent value={Tab.Settings}>
          <Settings />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export { Dashboard };
