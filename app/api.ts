////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";

import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { employees } from "./data";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeEmployees = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeEmployees.records)
      .map((key) => fakeEmployees.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeEmployees.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeEmployees.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeEmployees.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeEmployees.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeEmployees.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeEmployees.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["firstName", "lastName", "jobTitle", "address", "gender"],
    });
  }
  return contacts.sort(sortBy("lastName", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeEmployees.create({});
  return contact;
}

export async function createNew(
  values: ContactMutation
): Promise<ContactRecord> {
  const id = values.id || Math.random().toString(36).substring(2, 9);
  const createdAt = new Date().toISOString();
  const newContact = { id, createdAt, ...values };
  fakeEmployees.records[id] = newContact;
  return newContact;
}

export async function getContact(id: string) {
  return fakeEmployees.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeEmployees.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeEmployees.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeEmployees.destroy(id);
}

employees.forEach((employee) => {
  fakeEmployees.create(employee);
});
