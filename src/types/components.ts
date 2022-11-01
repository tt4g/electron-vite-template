import { ReactNode } from "react";

export type ChildrenProps = Readonly<{ children: ReactNode }>;

export type WithChildren<T> = T & ChildrenProps;

export type ClassNameProps = Readonly<{ className?: string }>;

export type WithClassName<T> = T & ClassNameProps;
