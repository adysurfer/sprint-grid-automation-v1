Feature: Tasks organization
    As a user
    I want to be able to create, remove tasks and dates, and change status of tasks.

    Background:
        Given I open sprint-grid web application page

    @e2e
    Scenario: Create a task row
        When I click on add task plus + button
        When I fill task name as 'Unique Task'
        When I click on Add button for task input
        Then I am able to create a new task row with 'Unique Task'
        When I clear the text in Add task input field
        Then I see the task input placeholder value as 'Fill the task title, please'
        Then I see validation message for task input field as 'The title is required'
        Then I see validation message text color for task input field as 'red'
        Then I see the Add button for adding task is disabled
        When I fill task name as 'Unique Task'
        Then I see validation message for task input field as 'The task with such name already exists'
        Then I see the Add button for adding task is disabled
        When I click on close button X for task field
        Then The add task input field is collapsed

    @e2c
    Scenario: Create a Date (column)
        When I click on Add date column + button
        When I select the date from datepicker as '03/03/2023'
        When I click on Add button for date column
        Then I am able to create a new date column as 'Mar 03, 2023'
        When I clear the date from date input field
        Then I see the date input placeholder value as 'Fill the date, please'
        Then I see a validation message for date input field as 'Date is required'
        Then I see validation message text color for date input field as 'red'
        Then I see the Add button for adding date is disabled
        When I enter date as '02-02-2023'
        Then I see a validation message for date input field as 'Follow the format mm/dd/yyyy'
        Then I see the Add button for adding date is disabled
        When I enter date as '12/32/2022'
        Then I see a validation message for date input field as 'Follow the format mm/dd/yyyy'
        Then I see the Add button for adding date is disabled
        When I enter date as '13/31/2022'
        Then I see a validation message for date input field as 'Follow the format mm/dd/yyyy'
        Then I see the Add button for adding date is disabled
        When I enter date as '12/12/2022'
        When I click on Add button for date column
        Then I am able to create a new date column as 'Dec 12, 2022'
        When I clear the date from date input field
        When I enter date as '12/12/2022'
        Then I see a validation message for date input field as 'This date already exists'
        Then I see the Add button for adding date is disabled
        When I click on close button X for date field
        Then The date column input field is collapsed

    @e2c
    Scenario Outline: Assign statuses
        Given A cell has no status on it
        When I click on a cell
		Then I see the cell expands
		Then I see an empty input field
		Then The placeholder text for input field is 'Set Status'
		When I click on an input field
        Then I see statuses list as 'To Do', 'In Progress', 'In Testing', 'Blocked', 'Done'
        When I select <status> status
        Then I am able set the <status> status in cell
        Then The table collapse
		When I click on a cell with status as <status>
        Then I see input field has value <status>
        Then The placeholder text for input field is 'Change status'
        When I click on an input field <status>
        Then I see statuses list as 'To Do', 'In Progress', 'In Testing', 'Blocked', 'Done'
        When I enter "random" text in the input field
        Then The status <status> is not changed

        |status     |
        |To Do      |
        |In Progress|
        |In Testing |
        |Blocked    | 
        |Done       |
    
    @e2c
    Scenario Outline: Remove task row and date (column)
        Given Table contains a task 'Unique Task' and date 'Mar 03, 2023'
        When I hover over the 'Unique Task'
        Then I see remove row button - red cross
        Then I see remove row button - red cross label as 'remove'
        When I click on remove row button - red cross
        Then The task row with name 'Unique Task' is deleted
        When I hover over the date 'Mar 03, 2023'
        Then I see remove column button - red cross
        Then I see remove column button - red cross label as 'remove'
        When I click on remove column button - red cross
        Then The date column with date 'Mar 03, 2023' is deleted