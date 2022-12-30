Feature: Tasks organization
    As a user
    I want to be able to create, remove tasks and dates, and change status of tasks.

    Background:
        Given I open sprint-grid web application page with page title as 'SprintGridApp'

    @e2e
    Scenario: Create a task row
        When I click on add task plus + button
        When I fill task name as 'Unique Task'
        When I click on Add button for task input
        Then I am able to add a new task row as 'Unique Task'
        When I clear the text in Add task input field
        Then I see the task input placeholder value as 'Fill the task title, please'
        Then I see validation message for task input field as 'The title is required'
        Then I see validation message text color for task input field as 'rgb(244, 67, 54)'
	Then I see the Add button for adding task is disabled
	When I fill task name as 'Unique Task'
        Then I see validation for task input field as 'The task with such name already exists'
        Then I see the Add button for adding task is disabled
        When I click on close task button X
        Then The add task input field is collapsed

    @e2e
    Scenario: Create a Date (column)
        When I click on Add date column + button
	When I click on the datepicker icon
        When I select the date from datepicker
        When I click on Add button for date column
        Then I am able to create a new date column as 'Dec 25, 2030'
        When I clear the date from date input field
        Then I see the date input placeholder value as 'Fill the date, please'
        Then I see a validation message for date input field as 'Date is required'
        Then I see validation message text color for date input field as 'rgb(244, 67, 54)'
        Then I see the Add button for adding date is disabled
        Then I enter date and verify validation msg for incorrect date formats as 'Follow the format mm/dd/yyyy'
		| incorrect dates format |
		| 12-31-2022             |
		| 12.31.2022             |
        	| 12/31/202              |
		| 12/31/20               |
        	| 12/31/2                |
		| 12/31                  |
        	| 12                     |
        	| -1                     |
        	| 31/12/2022             |
		| 32/12/2022             |
        	| 12/32/2022             |
        	| 13/32/2022             |
		
	Then I see the Add button for adding date is disabled
        When I enter date as '12/12/2022'
        When I click on Add button for date column
        Then I am able to create a new date column as 'Dec 12, 2022'
        When I clear the date from date input field
        When I enter date as '12/12/2022'
        Then I see a validation for date input field as 'This date already exists'
        Then I see the Add button for adding date is disabled
        When I click on close date column button X
        Then The date column input field is collapsed

    @e2e
    Scenario Outline: Assign statuses 
        When I click on an empty cell
	Then The placeholder text for input field is 'Set Status'
	When I click on an input field
        Then I see statuses list as
		|statuses   |
 		|To Do      |
  		|In Progress|
        	|In Testing |
        	|Blocked    | 
        	|Done       |

        When I select '<status>' status
	Then The cell collapse
        Then Cell has '<status>' status now
	When I click on a cell with status as '<status>'
        When I enter "randomstatus" text in the cell input field
        Then The existing status '<status>' on cell is not changed
		
	Examples:
            |status     |
            |To Do      |
            |In Progress|
            |In Testing |
            |Blocked    | 
            |Done       |    
    
    @e2e
    Scenario Outline: Remove task row and date (column)
        When I hover over the '<task>' row
        Then I see remove row button
        When I click on remove task row button
        Then The task row with name '<task>' is deleted
        When I hover over the date column '<date>'
        Then I see remove column button
        When I click on remove date column button
        Then The date column with date '<date>' is deleted
	
		Examples:
			| task    | date        |
			| Task 1  | Jun 1, 2020 |
            		| Task 2  | May 2, 2020 |
