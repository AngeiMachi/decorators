import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../components/simple-dialog/simple-dialog.component';
import { Type } from '@angular/core';
import { Injector } from '@angular/core';


export interface ConfirmableDecoratorOptions {
  title?: string;
  text?: string;
}

export function Confirmable() {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const config: ConfirmableDecoratorOptions = {
      title: 'Confirmationen needed',
      text: 'Are you sure?',
    };

    descriptor.value = async function (...args: any[]) {
    
        //@ts-ignore
        const injector: Injector = this.INJECTOR as Injector;
        const dialog: MatDialog = injector.get<MatDialog>(MatDialog);
        const dialogRef: MatDialogRef<SimpleDialogComponent> = dialog.open(
            SimpleDialogComponent,
            {
            data: {
                title: config.title,
                text: config.text,
            },
            }
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
            return originalMethod.apply(this, args);
            }
        });
    };
        return descriptor;
  };
}