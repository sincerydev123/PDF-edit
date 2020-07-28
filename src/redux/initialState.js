import React from 'react';

import ToggleZoomOverlay from 'components/ToggleZoomOverlay';
import ToolsOverlay from 'components/ToolsOverlay';
import actions from 'actions';
import defaultTool from 'constants/defaultTool';

import core from 'core';
import getHashParams from 'helpers/getHashParams';
import { copyMapWithDataProperties } from 'constants/map';
import Ribbons from 'components/Ribbons';

export default {
  viewer: {
    canUndo: false,
    canRedo: false,
    toolbarGroup: 'toolbarGroup-Annotate',
    activeTheme: 'light',
    disabledElements: {},
    openElements: {
      header: true,
      toolsHeader: true,
    },
    panelWidths: {
      leftPanel: 264,
      searchPanel: 293,
      notesPanel: 293,
    },
    lastPickedToolForGroup: {},
    lastPickedToolGroup: {},
    headers: {
      default: [
        { type: 'toggleElementButton', img: 'icon-header-sidebar-line', element: 'leftPanel', dataElement: 'leftPanelButton', title: 'component.leftPanel' },
        { type: 'divider' },
        { type: 'toggleElementButton', img: 'icon-header-page manipulation-line', element: 'viewControlsOverlay', dataElement: 'viewControlsButton', title: 'component.viewControlsOverlay' },
        {
          type: 'customElement',
          render: () => <ToggleZoomOverlay />,
          dataElement: 'zoomOverlayButton',
          element: 'zoomOverlay',
          style: {
            height: '100%',
          },
          hiddenOnMobileDevice: true,
        },
        { type: 'divider', hidden: ['small-mobile', 'mobile', 'tablet'] },
        { type: 'toolButton', toolName: 'Pan' },
        // For mobile
        { type: 'toolButton', toolName: 'TextSelect' },
        { type: 'toolButton', toolName: 'AnnotationEdit', hidden: ['small-mobile', 'mobile'] },
        {
          type: 'customElement',
          render: () => <Ribbons />,
          className: 'custom-ribbons-container',
        },
        { type: 'toggleElementButton', dataElement: 'searchButton', element: 'searchPanel', img: 'icon-header-search', title: 'component.searchPanel', hidden: ['small-mobile'] },
        { type: 'toggleElementButton', dataElement: 'toggleNotesButton', element: 'notesPanel', img: 'icon-header-chat-line', title: 'component.notesPanel', hidden: ['small-mobile'] },
        { type: 'toggleElementButton', dataElement: 'menuButton', element: 'menuOverlay', img: 'icon-header-settings-line', title: 'component.menuOverlay', hidden: ['small-mobile'] },
        {
          type: 'actionButton',
          dataElement: 'moreButton',
          title: 'action.redo',
          img: 'icon-tools-more',
          onClick: dispatch => {
            dispatch(actions.setActiveHeaderGroup('small-mobile-more-buttons'));
            core.setToolMode(defaultTool);
          },
          hidden: ['mobile', 'tablet', 'desktop'],
        },
      ],
      'small-mobile-more-buttons': [
        { type: 'toggleElementButton', dataElement: 'searchButton', element: 'searchPanel', img: 'icon-header-search', title: 'component.searchPanel' },
        { type: 'toggleElementButton', dataElement: 'toggleNotesButton', element: 'notesPanel', img: 'icon-header-chat-line', title: 'component.notesPanel' },
        { type: 'toggleElementButton', dataElement: 'menuButton', element: 'menuOverlay', img: 'icon-header-settings-line', title: 'component.menuOverlay' },
        { type: 'spacer' },
        {
          type: 'actionButton',
          dataElement: 'defaultHeaderButton',
          titile: 'action.close',
          img: 'ic_close_black_24px',
          onClick: dispatch => {
            dispatch(actions.setActiveHeaderGroup('default'));
            core.setToolMode(defaultTool);
          },
        },
      ],
      "toolbarGroup-View": [],
      "toolbarGroup-Annotate": [
        { type: 'spacer' },
        { type: 'toolGroupButton', toolGroup: 'highlightTools', dataElement: 'highlightToolGroupButton', title: 'annotation.highlight' },
        { type: 'toolGroupButton', toolGroup: 'underlineTools', dataElement: 'underlineToolGroupButton', title: 'annotation.underline' },
        { type: 'toolGroupButton', toolGroup: 'strikeoutTools', dataElement: 'strikeoutToolGroupButton', title: 'annotation.strikeout' },
        { type: 'toolGroupButton', toolGroup: 'squigglyTools', dataElement: 'squigglyToolGroupButton', title: 'annotation.squiggly' },
        { type: 'toolGroupButton', toolGroup: 'stickyTools', dataElement: 'stickyToolGroupButton', title: 'annotation.stickyNote' },
        { type: 'toolGroupButton', toolGroup: 'freeTextTools', dataElement: 'freeTextToolGroupButton', title: 'annotation.freetext' },
        { type: 'toolGroupButton', toolGroup: 'rectangleTools', dataElement: 'shapeToolGroupButton', title: 'annotation.rectangle' },
        { type: 'toolGroupButton', toolGroup: 'freeHandTools', dataElement: 'freeHandToolGroupButton', title: 'annotation.freehand' },
        { type: 'divider' },
        {
          type: 'customElement',
          render: () => <ToolsOverlay />,
          dataElement: 'toolsOverlay',
          hidden: ['small-mobile', 'mobile'],
        },
        {
          type: 'actionButton',
          style: { 'marginLeft': '0px' },
          dataElement: 'undoButton',
          title: 'action.undo',
          img: 'icon-operation-undo',
          onClick: () => {
            core.undo();
          },
          isNotClickableSelector: state => !state.viewer.canUndo,
        },
        {
          type: 'actionButton',
          dataElement: 'redoButton',
          title: 'action.redo',
          img: 'icon-operation-redo',
          onClick: () => {
            core.redo();
          },
          isNotClickableSelector: state => !state.viewer.canRedo,
        },
        { type: 'toolButton', toolName: 'AnnotationEraserTool' },
        { type: 'spacer', hidden: ['tablet', 'mobile', 'small-mobile'] },
      ],
      "toolbarGroup-Shapes": [
        { type: 'spacer' },
        { type: 'toolGroupButton', toolGroup: 'freeHandTools', dataElement: 'freeHandToolGroupButton', title: 'annotation.freehand' },
        { type: 'toolGroupButton', toolGroup: 'rectangleTools', dataElement: 'shapeToolGroupButton', title: 'annotation.rectangle' },
        { type: 'toolGroupButton', toolGroup: 'ellipseTools', dataElement: 'ellipseToolGroupButton', title: 'annotation.ellipse' },
        { type: 'toolGroupButton', toolGroup: 'polygonTools', dataElement: 'polygonToolGroupButton', title: 'annotation.polygon' },
        { type: 'toolGroupButton', toolGroup: 'cloudTools', dataElement: 'polygonCloudToolGroupButton', title: 'annotation.polygonCloud' },
        { type: 'toolGroupButton', toolGroup: 'lineTools', dataElement: 'lineToolGroupButton', title: 'annotation.line' },
        { type: 'toolGroupButton', toolGroup: 'polyLineTools', dataElement: 'polyLineToolGroupButton', title: 'annotation.polyline' },
        { type: 'toolGroupButton', toolGroup: 'arrowTools', dataElement: 'arrowToolGroupButton', title: 'annotation.arrow' },
        { type: 'divider' },
        {
          type: 'customElement',
          render: () => <ToolsOverlay />,
          dataElement: 'toolsOverlay',
          hidden: ['small-mobile', 'mobile'],
        },
        {
          type: 'actionButton',
          style: { 'marginLeft': '0px' },
          dataElement: 'undoButton',
          title: 'action.undo',
          img: 'icon-operation-undo',
          onClick: () => {
            core.undo();
          },
          isNotClickableSelector: state => !state.viewer.canUndo,
        },
        {
          type: 'actionButton',
          dataElement: 'redoButton',
          title: 'action.redo',
          img: 'icon-operation-redo',
          onClick: () => {
            core.redo();
          },
          isNotClickableSelector: state => !state.viewer.canRedo,
        },
        { type: 'toolButton', toolName: 'AnnotationEraserTool' },
        { type: 'spacer', hidden: ['tablet', 'mobile', 'small-mobile'] },
      ],
      "toolbarGroup-Insert": [
        { type: 'spacer' },
        { type: 'toolGroupButton', toolGroup: 'signatureTools', img: 'icon-tool-signature', dataElement: 'signatureToolButton', title: 'annotation.signature', showColor: 'never' },
        { type: 'toolGroupButton', toolGroup: 'rubberStampTools', img: 'icon-tool-stamp-line', dataElement: 'rubberStampToolButton', title: 'annotation.rubberStamp' },
        { type: 'toolGroupButton', toolGroup: 'stampTools', img: 'icon-tool-image-line', dataElement: 'stampToolButton', title: 'annotation.stamp' },
        { type: 'toolGroupButton', toolGroup: 'fileAttachmentTools', img: 'ic_fileattachment_24px', dataElement: 'fileAttachmentToolButton', title: 'annotation.fileattachment', showColor: 'never' },
        { type: 'toolGroupButton', toolGroup: 'calloutTools', dataElement: 'calloutToolGroupButton', title: 'annotation.callout' },
        { type: 'divider' },
        {
          type: 'customElement',
          render: () => <ToolsOverlay />,
          dataElement: 'toolsOverlay',
          hidden: ['small-mobile', 'mobile'],
        },
        {
          type: 'actionButton',
          style: { 'marginLeft': '0px' },
          dataElement: 'undoButton',
          title: 'action.undo',
          img: 'icon-operation-undo',
          onClick: () => {
            core.undo();
          },
          isNotClickableSelector: state => !state.viewer.canUndo,
        },
        {
          type: 'actionButton',
          dataElement: 'redoButton',
          title: 'action.redo',
          img: 'icon-operation-redo',
          onClick: () => {
            core.redo();
          },
          isNotClickableSelector: state => !state.viewer.canRedo,
        },
        { type: 'toolButton', toolName: 'AnnotationEraserTool' },
        { type: 'spacer', hidden: ['tablet', 'mobile', 'small-mobile'] },
      ],
      "toolbarGroup-Measure": [
        { type: 'spacer' },
        { type: 'toolGroupButton', toolGroup: 'distanceTools', dataElement: 'distanceToolGroupButton', title: 'annotation.distanceMeasurement' },
        { type: 'toolGroupButton', toolGroup: 'perimeterTools', dataElement: 'perimeterToolGroupButton', title: 'annotation.perimeterMeasurement' },
        { type: 'toolGroupButton', toolGroup: 'areaTools', dataElement: 'areaToolGroupButton', title: 'annotation.areaMeasurement' },
        { type: 'toolGroupButton', toolGroup: 'ellipseAreaTools', dataElement: 'ellipseAreaToolGroupButton', title: 'annotation.areaMeasurement' },
        { type: 'toolGroupButton', toolGroup: 'rectangleAreaTools', dataElement: 'rectangleAreaToolGroupButton', title: 'annotation.areaMeasurement' },
        { type: 'toolGroupButton', toolGroup: 'countTools', dataElement: 'countToolGroupButton', title: 'annotation.countMeasurement' },
        { type: 'divider' },
        {
          type: 'customElement',
          render: () => <ToolsOverlay />,
          dataElement: 'toolsOverlay',
          hidden: ['small-mobile', 'mobile'],
        },
        {
          type: 'actionButton',
          style: { 'marginLeft': '0px' },
          dataElement: 'undoButton',
          title: 'action.undo',
          img: 'icon-operation-undo',
          onClick: () => {
            core.undo();
          },
          isNotClickableSelector: state => !state.viewer.canUndo,
        },
        {
          type: 'actionButton',
          dataElement: 'redoButton',
          title: 'action.redo',
          img: 'icon-operation-redo',
          onClick: () => {
            core.redo();
          },
          isNotClickableSelector: state => !state.viewer.canRedo,
        },
        { type: 'toolButton', toolName: 'AnnotationEraserTool' },
        { type: 'spacer', hidden: ['tablet', 'mobile', 'small-mobile'] },
      ],
      "toolbarGroup-Edit": [
        { type: 'spacer' },
        { type: 'toolGroupButton', toolGroup: 'cropTools', dataElement: 'cropToolGroupButton', title: 'annotation.crop' },
        { type: 'toolGroupButton', toolGroup: 'redactionTools', dataElement: 'redactionToolGroupButton', title: 'annotation.redact', showColor: 'never' },
        { type: 'divider' },
        {
          type: 'actionButton',
          style: { 'marginLeft': '0px' },
          dataElement: 'undoButton',
          title: 'action.undo',
          img: 'icon-operation-undo',
          onClick: () => {
            core.undo();
          },
          isNotClickableSelector: state => !state.viewer.canUndo,
        },
        {
          type: 'actionButton',
          dataElement: 'redoButton',
          title: 'action.redo',
          img: 'icon-operation-redo',
          onClick: () => {
            core.redo();
          },
          isNotClickableSelector: state => !state.viewer.canRedo,
        },
        { type: 'toolButton', toolName: 'AnnotationEraserTool' },
        { type: 'spacer', hidden: ['mobile', 'small-mobile'] },
      ],
    },
    annotationPopup: [
      { dataElement: 'annotationCommentButton' },
      { dataElement: 'annotationStyleEditButton' },
      { dataElement: 'annotationRedactButton' },
      { dataElement: 'annotationCropButton' },
      { dataElement: 'annotationGroupButton' },
      { dataElement: 'annotationUngroupButton' },
      { dataElement: 'annotationDeleteButton' },
      { dataElement: 'calibrateButton' },
      { dataElement: 'linkButton' },
      { dataElement: 'fileAttachmentDownload' },
    ],
    textPopup: [
      { dataElement: 'copyTextButton' },
      { dataElement: 'textHighlightToolButton' },
      { dataElement: 'textUnderlineToolButton' },
      { dataElement: 'textSquigglyToolButton' },
      { dataElement: 'textStrikeoutToolButton' },
      { dataElement: 'textRedactToolButton' },
      { dataElement: 'linkButton' },
    ],
    contextMenuPopup: [
      { dataElement: 'panToolButton' },
      { dataElement: 'stickyToolButton' },
      { dataElement: 'highlightToolButton' },
      { dataElement: 'freeHandToolButton' },
      { dataElement: 'freeTextToolButton' },
    ],
    toolButtonObjects: {
      AnnotationCreateCountMeasurement: { dataElement: 'countMeasurementToolButton', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateCountMeasurement2: { dataElement: 'countMeasurementToolButton2', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateCountMeasurement3: { dataElement: 'countMeasurementToolButton3', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateCountMeasurement4: { dataElement: 'countMeasurementToolButton4', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement: { dataElement: 'distanceMeasurementToolButton', title: 'annotation.distanceMeasurement', img: 'ic_annotation_distance_black_24px', group: 'distanceTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement2: { dataElement: 'distanceMeasurementToolButton2', title: 'annotation.distanceMeasurement', img: 'ic_annotation_distance_black_24px', group: 'distanceTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement3: { dataElement: 'distanceMeasurementToolButton3', title: 'annotation.distanceMeasurement', img: 'ic_annotation_distance_black_24px', group: 'distanceTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement4: { dataElement: 'distanceMeasurementToolButton4', title: 'annotation.distanceMeasurement', img: 'ic_annotation_distance_black_24px', group: 'distanceTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement: { dataElement: 'perimeterMeasurementToolButton', title: 'annotation.perimeterMeasurement', img: 'ic_annotation_perimeter_black_24px', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement2: { dataElement: 'perimeterMeasurementToolButton2', title: 'annotation.perimeterMeasurement', img: 'ic_annotation_perimeter_black_24px', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement3: { dataElement: 'perimeterMeasurementToolButton3', title: 'annotation.perimeterMeasurement', img: 'ic_annotation_perimeter_black_24px', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement4: { dataElement: 'perimeterMeasurementToolButton4', title: 'annotation.perimeterMeasurement', img: 'ic_annotation_perimeter_black_24px', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement: { dataElement: 'areaMeasurementToolButton', title: 'annotation.areaMeasurement', img: 'ic_annotation_area_black_24px', group: 'areaTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement2: { dataElement: 'areaMeasurementToolButton2', title: 'annotation.areaMeasurement', img: 'ic_annotation_area_black_24px', group: 'areaTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement3: { dataElement: 'areaMeasurementToolButton3', title: 'annotation.areaMeasurement', img: 'ic_annotation_area_black_24px', group: 'areaTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement4: { dataElement: 'areaMeasurementToolButton4', title: 'annotation.areaMeasurement', img: 'ic_annotation_area_black_24px', group: 'areaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement: { dataElement: 'ellipseMeasurementToolButton', title: 'annotation.areaMeasurement', img: 'ic_annotation_ellipse_area_black', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement2: { dataElement: 'ellipseMeasurementToolButton2', title: 'annotation.areaMeasurement', img: 'ic_annotation_ellipse_area_black', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement3: { dataElement: 'ellipseMeasurementToolButton3', title: 'annotation.areaMeasurement', img: 'ic_annotation_ellipse_area_black', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement4: { dataElement: 'ellipseMeasurementToolButton4', title: 'annotation.areaMeasurement', img: 'ic_annotation_ellipse_area_black', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement: { dataElement: 'rectangularAreaMeasurementToolButton', title: 'annotation.areaMeasurement', img: 'ic_annotation_rectangular_area_black_24px', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement2: { dataElement: 'rectangularAreaMeasurementToolButton2', title: 'annotation.areaMeasurement', img: 'ic_annotation_rectangular_area_black_24px', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement3: { dataElement: 'rectangularAreaMeasurementToolButton3', title: 'annotation.areaMeasurement', img: 'ic_annotation_rectangular_area_black_24px', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement4: { dataElement: 'rectangularAreaMeasurementToolButton4', title: 'annotation.areaMeasurement', img: 'ic_annotation_rectangular_area_black_24px', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateFreeHand: { dataElement: 'freeHandToolButton', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateFreeHand2: { dataElement: 'freeHandToolButton2', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateFreeHand3: { dataElement: 'freeHandToolButton3', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateFreeHand4: { dataElement: 'freeHandToolButton4', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateTextHighlight: { dataElement: 'highlightToolButton', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextHighlight2: { dataElement: 'highlightToolButton2', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextHighlight3: { dataElement: 'highlightToolButton3', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextHighlight4: { dataElement: 'highlightToolButton4', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextUnderline: { dataElement: 'underlineToolButton', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextUnderline2: { dataElement: 'underlineToolButton2', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextUnderline3: { dataElement: 'underlineToolButton3', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextUnderline4: { dataElement: 'underlineToolButton4', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextSquiggly: { dataElement: 'squigglyToolButton', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextSquiggly2: { dataElement: 'squigglyToolButton2', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextSquiggly3: { dataElement: 'squigglyToolButton3', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextSquiggly4: { dataElement: 'squigglyToolButton4', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextStrikeout: { dataElement: 'strikeoutToolButton', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateTextStrikeout2: { dataElement: 'strikeoutToolButton2', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateTextStrikeout3: { dataElement: 'strikeoutToolButton3', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateTextStrikeout4: { dataElement: 'strikeoutToolButton4', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateFreeText: { dataElement: 'freeTextToolButton', title: 'annotation.freetext2', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateFreeText2: { dataElement: 'freeTextToolButton2', title: 'annotation.freetext2', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateFreeText3: { dataElement: 'freeTextToolButton3', title: 'annotation.freetext2', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateFreeText4: { dataElement: 'freeTextToolButton4', title: 'annotation.freetext2', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateCallout: { dataElement: 'calloutToolButton', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateCallout2: { dataElement: 'calloutToolButton2', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateCallout3: { dataElement: 'calloutToolButton3', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateCallout4: { dataElement: 'calloutToolButton4', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateSticky: { dataElement: 'sitckyToolButton', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateSticky2: { dataElement: 'sitckyToolButton2', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateSticky3: { dataElement: 'sitckyToolButton3', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateSticky4: { dataElement: 'sitckyToolButton4', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateRectangle: { dataElement: 'rectangleToolButton', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateRectangle2: { dataElement: 'rectangleToolButton2', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateRectangle3: { dataElement: 'rectangleToolButton3', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateRectangle4: { dataElement: 'rectangleToolButton4', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateEllipse: { dataElement: 'ellipseToolButton', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateEllipse2: { dataElement: 'ellipseToolButton2', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateEllipse3: { dataElement: 'ellipseToolButton3', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateEllipse4: { dataElement: 'ellipseToolButton4', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateLine: { dataElement: 'lineToolButton', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreateLine2: { dataElement: 'lineToolButton2', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreateLine3: { dataElement: 'lineToolButton3', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreateLine4: { dataElement: 'lineToolButton4', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreatePolyline: { dataElement: 'polylineToolButton', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolyline2: { dataElement: 'polylineToolButton2', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolyline3: { dataElement: 'polylineToolButton3', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolyline4: { dataElement: 'polylineToolButton4', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolygon: { dataElement: 'polygonToolButton', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygon2: { dataElement: 'polygonToolButton2', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygon3: { dataElement: 'polygonToolButton3', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygon4: { dataElement: 'polygonToolButton4', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygonCloud: { dataElement: 'cloudToolButton', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreatePolygonCloud2: { dataElement: 'cloudToolButton2', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreatePolygonCloud3: { dataElement: 'cloudToolButton4', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreatePolygonCloud4: { dataElement: 'cloudToolButton5', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreateArrow: { dataElement: 'arrowToolButton', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateArrow2: { dataElement: 'arrowToolButton2', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateArrow3: { dataElement: 'arrowToolButton3', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateArrow4: { dataElement: 'arrowToolButton4', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateSignature: { dataElement: 'signatureToolButton', title: 'annotation.signature', img: 'icon-tool-signature', group: 'signatureTools', showColor: 'never' },
      AnnotationCreateFileAttachment: { dataElement: 'fileAttachmentToolButton', title: 'annotation.fileattachment', img: 'ic_fileattachment_24px', group: 'fileAttachmentTools', showColor: 'never' },
      AnnotationCreateStamp: { dataElement: 'stampToolButton', title: 'annotation.stamp', img: 'icon-tool-image-line', group: 'stampTools', showColor: 'active' },
      AnnotationCreateRubberStamp: { dataElement: 'rubberStampToolButton', title: 'annotation.rubberStamp', img: 'icon-tool-stamp-line', group: 'rubberStampTools', showColor: 'active' },
      CropPage: { dataElement: 'cropToolButton', title: 'annotation.crop', img: 'ic_crop_black_24px', showColor: 'never', group: 'cropTools' },
      AnnotationCreateRedaction: { dataElement: 'redactionButton', title: 'option.redaction.markForRedaction', img: 'icon-tool-redaction-area', group: 'redactionTools', showColor: 'never' },
      Pan: { dataElement: 'panToolButton', title: 'tool.pan', img: 'icon-header-pan', showColor: 'never' },
      AnnotationEdit: { dataElement: 'selectToolButton', title: 'tool.select', img: 'multi select', showColor: 'never' },
      TextSelect: { dataElement: 'textSelectButton', img: 'icon - header - select - line', showColor: 'never' },
      MarqueeZoomTool: { dataElement: 'marqueeToolButton', showColor: 'never' },
      AnnotationEraserTool: { dataElement: 'eraserToolButton', title: 'annotation.eraser', img: 'icon-operation-eraser', showColor: 'never' },
    },
    tab: {
      signatureModal: 'inkSignaturePanelButton',
      linkModal: 'URLPanelButton',
      rubberStampTab: 'standardStampPanelButton',
    },
    customElementOverrides: {},
    activeHeaderGroup: 'default',
    activeToolName: 'AnnotationEdit',
    activeToolStyles: {},
    activeLeftPanel: 'thumbnailsPanel',
    activeToolGroup: '',
    notePopupId: '',
    isNoteEditing: false,
    fitMode: '',
    zoom: 1,
    rotation: 0,
    displayMode: 'Single',
    currentPage: 1,
    sortStrategy: 'position',
    isFullScreen: false,
    isMultipleViewerMerging: false,
    isThumbnailMerging: true,
    isThumbnailReordering: true,
    isThumbnailMultiselect: true,
    allowPageNavigation: true,
    enableMouseWheelZoom: true,
    doesAutoLoad: getHashParams('auto_load', true),
    isReadOnly: getHashParams('readonly', false),
    customModals: [],
    customPanels: [],
    useEmbeddedPrint: false,
    pageLabels: [],
    selectedThumbnailPageIndexes: [],
    noteDateFormat: 'MMM D, h:mma',
    colorMap: copyMapWithDataProperties('currentPalette', 'iconColor'),
    warning: {},
    customNoteFilter: null,
    zoomList: [0.1, 0.25, 0.5, 1, 1.25, 1.5, 2, 4, 8, 16, 64],
    isAccessibleMode: getHashParams('accessibleMode', false),
    measurementUnits: {
      from: ['in', 'mm', 'cm', 'pt'],
      to: ['in', 'mm', 'cm', 'pt', 'ft', 'm', 'yd', 'km', 'mi'],
    },
    maxSignaturesCount: 4,
    signatureFonts: ['GreatVibes-Regular'],
    isReplyDisabledFunc: null,
    userData: [],
    customMeasurementOverlay: [],
    noteTransformFunction: null,
    standardStamps: [],
    customStamps: [],
    selectedStampIndex: 0,
    savedSignatures: [],
    selectedSignatureIndex: 0,
    annotationContentOverlayHandler: null,
    isSnapModeEnabled: false
  },
  search: {
    listeners: [],
    value: '',
    isCaseSensitive: false,
    isWholeWord: false,
    isWildcard: false,
    isRegex: false,
    isSearchUp: false,
    isAmbientString: false,
    results: [],
    isProgrammaticSearch: false,
    isProgrammaticSearchFull: false,
  },
  document: {
    totalPages: 0,
    outlines: [],
    bookmarks: {},
    layers: [],
    printQuality: 1,
    passwordAttempts: -1,
    loadingProgress: 0,
  },
  user: {
    name: getHashParams('user', 'Guest'),
    isAdmin: getHashParams('admin', false),
  },
  advanced: {
    customCSS: getHashParams('css', null),
    defaultDisabledElements: getHashParams('disabledElements', ''),
    fullAPI: getHashParams('pdfnet', false),
    preloadWorker: getHashParams('preloadWorker', false),
    serverUrl: getHashParams('server_url', ''),
    serverUrlHeaders: JSON.parse(getHashParams('serverUrlHeaders', '{}')),
    useSharedWorker: getHashParams('useSharedWorker', false),
    disableI18n: getHashParams('disableI18n', false),
    pdfWorkerTransportPromise: null,
    officeWorkerTransportPromise: null
  },
};
