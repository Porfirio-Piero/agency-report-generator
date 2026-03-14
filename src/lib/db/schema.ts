import { pgTable, uuid, text, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table (managed by Clerk)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Agency settings
export const agencySettings = pgTable("agency_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  agencyName: text("agency_name").notNull(),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").default("#8b5cf6"),
  deliveryTime: text("delivery_time").default("06:00"),
  deliveryDay: text("delivery_day").default("monday"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Clients
export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  email: text("email"),
  company: text("company"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Platform connections
export const platformConnections = pgTable("platform_connections", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clients.id).notNull(),
  platform: text("platform").notNull(), // 'google_analytics', 'facebook_ads', 'linkedin_ads'
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  platformAccountId: text("platform_account_id"),
  platformAccountName: text("platform_account_name"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Reports
export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clients.id).notNull(),
  weekStart: timestamp("week_start").notNull(),
  weekEnd: timestamp("week_end").notNull(),
  pdfUrl: text("pdf_url"),
  sentAt: timestamp("sent_at"),
  status: text("status").default("pending"), // 'pending', 'generated', 'sent', 'failed'
  createdAt: timestamp("created_at").defaultNow(),
});

// Report metrics
export const reportMetrics = pgTable("report_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportId: uuid("report_id").references(() => reports.id).notNull(),
  platform: text("platform").notNull(),
  impressions: text("impressions"),
  clicks: text("clicks"),
  conversions: text("conversions"),
  spend: text("spend"),
  revenue: text("revenue"),
  ctr: text("ctr"),
  cpc: text("cpc"),
  roas: text("roas"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  clients: many(clients),
  agencySettings: many(agencySettings),
}));

export const clientsRelations = relations(clients, ({ many, one }) => ({
  connections: many(platformConnections),
  reports: many(reports),
  user: one(users, {
    fields: [users.id],
    references: [users.id],
  }),
}));

export const platformConnectionsRelations = relations(platformConnections, ({ one }) => ({
  client: one(clients, {
    fields: [clients.id],
    references: [clients.id],
  }),
}));

export const reportsRelations = relations(reports, ({ many, one }) => ({
  metrics: many(reportMetrics),
  client: one(clients, {
    fields: [clients.id],
    references: [clients.id],
  }),
}));

export const reportMetricsRelations = relations(reportMetrics, ({ one }) => ({
  report: one(reports, {
    fields: [reports.id],
    references: [reports.id],
  }),
}));