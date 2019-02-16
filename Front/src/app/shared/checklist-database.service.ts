import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs'

/**
 * Node for to-do item
 */
export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
  }
  
  /** Flat to-do item node with expandable and level information */
  export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
  }

@Injectable({
  providedIn: 'root'
})
export class ChecklistDatabase {
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  
    get data(): TodoItemNode[] { return this.dataChange.value; }
  
    constructor() {
    }
  
    initialize(treeData) {
      // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
      //     file node as children.
      const data = this.buildFileTree(treeData, 0);
  
      // Notify the change.
      this.dataChange.next(data);
    }
  
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
      return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
        const value = obj[key];
        const node = new TodoItemNode();
        node.item = key;
  
        if (value != null) {
          if (typeof value === 'object') {
            node.children = this.buildFileTree(value, level + 1);
          } else {
            node.item = value;
          }
        }
  
        return accumulator.concat(node);
      }, []);
    }
  
  }
