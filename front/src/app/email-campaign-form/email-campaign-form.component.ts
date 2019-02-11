import { Component, ViewChild, Injectable, OnInit } from "@angular/core";
import * as moment from "moment";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { DataStorageService } from "../shared/data-storage.service";
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import {
  ChecklistDatabase,
  TodoItemFlatNode,
  TodoItemNode
} from "../shared/checklist-database.service";

import * as _ from "lodash";

@Component({
  selector: "app-email-campaign-form",
  templateUrl: "./email-campaign-form.component.html",
  styleUrls: ["./email-campaign-form.component.css"]
})
export class EmailCampaignFormComponent implements OnInit {
  @ViewChild("f1") form1: any;
  @ViewChild("f2") form2: any;
  campaignCategories = [];
  campaignTypes = [];
  responses = [];
  messageTypes = [];
  phases = [];
  audienceSegments = [];
  treeData = {};
  keyVisuals = [];
  formFields = {};
  today = moment();
  campaignAttributes = {
    channel: "Email",
    name: "",
    description: "",
    campaignType: "",
    campaignCategory: "",
    product: [],
    alwaysOn: true,
    deploymentDate: "",
    phase: "",
    messageType: "",
    touch: 0,
    numOfCreatives: "",
    creativeAttributes: []
  };

  creativeAttributesTemplate = {
    creativeVerison: "",
    creativeDescription: "",
    keyVisual: "",
    offer: "",
    audienceSegment: []
  };

  isCampaignAttributes = true;
  isCreativeAttributes = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dataStorageService: DataStorageService,
    private database: ChecklistDatabase
  ) {
    this.getFormData();
    this.initializeTree();
  }

  getFormData() {
    let formData = this.dataStorageService.formData;
    this.treeData = JSON.parse(JSON.stringify(formData.products));
    this.campaignCategories = formData.campaignCategories;
    this.campaignTypes = formData.campaignTypes;
    this.messageTypes = formData.messageTypes;
    this.phases = formData.phases;
    this.audienceSegments = formData.audienceSegments;
    this.keyVisuals = formData.keyVisuals;
    this.responses = formData.responses;
    this.formFields = formData.formFieldsEmail;
  }

  initializeTree() {
    this.database.initialize(this.treeData);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {}

  navigateToCampaignAttributes() {
    this.isCampaignAttributes = true;
    this.isCreativeAttributes = false;
  }

  onCampaignAttributeSubmit() {
    console.log("in this function");
    if (
      this.campaignAttributes.creativeAttributes.length <
      Number(this.campaignAttributes.numOfCreatives)
    ) {
      for (
        let i = this.campaignAttributes.creativeAttributes.length;
        i < Number(this.campaignAttributes.numOfCreatives);
        i++
      ) {
        this.campaignAttributes.creativeAttributes.push(
          JSON.parse(JSON.stringify(this.creativeAttributesTemplate))
        );
      }
    }

    if (
      this.campaignAttributes.creativeAttributes.length >
      Number(this.campaignAttributes.numOfCreatives)
    ) {
      while (
        this.campaignAttributes.creativeAttributes.length >
        Number(this.campaignAttributes.numOfCreatives)
      ) {
        this.campaignAttributes.creativeAttributes.splice(
          this.campaignAttributes.creativeAttributes.length - 1,
          1
        );
      }
    }
    this.isCreativeAttributes = true;
    this.isCampaignAttributes = false;
  }
  onCreativeAttributeSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.campaignAttributes);
        this.campaignAttributes.product = this.getSelectedRootNode(
          this.checklistSelection.selected
        );
        this.createCampaign();
      }
      this.dialog.closeAll();
    });
  }

  async createCampaign() {
    try {
      await this.dataStorageService.createCampaign(this.campaignAttributes);
      this.router.navigate(["main/dashboard"]);
    } catch (err) {
      alert(err.message);
    }
  }

  //--------------------------------temp---------------------------

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
    true /* multiple */
  );

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.item === "";

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  getSelectedRootNode(selection) {
    let returnArray = [];
    _.each(selection, item => {
      if (!item.expandable) {
        returnArray.push(item.item);
      }
    });

    return returnArray;
  }
}
